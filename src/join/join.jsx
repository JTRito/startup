import React from 'react';
import { useNavigate } from 'react-router-dom';
import './join.css';

import { Game } from './game';
import Button from 'react-bootstrap/Button'
import { Create } from './create';
import { Player } from './player';
import { Open } from './open';

export function Join({ userName }) {
  const [games, setGames] = React.useState([]);
  const navigate = useNavigate();

  function resetGames() {
    localStorage.removeItem('games');
    setGames([]);
  }

  function joinCurrentGame(game){
    game.joinGame(userName);

    const updatedGames = [...games]; 
    setGames(updatedGames);

    localStorage.setItem('games', JSON.stringify(updatedGames));

    navigate('/game');
  }

  function createGame(gameName, playerCount) {
    const game = new Game(gameName, playerCount);
    game.joinGame(userName);

    const newGamesList = [...games, game];
    setGames(newGamesList);

    const jsonGames = JSON.stringify(newGamesList);
    localStorage.setItem('games', jsonGames);
    navigate('/game');
  }

  React.useEffect(() => {
    const gamesText = localStorage.getItem('games');
    if (gamesText) {
      const plainGames = JSON.parse(gamesText);
      const realGames = plainGames.map(g => {
        const gameInstance = new Game(g.name, g.max);
        gameInstance.players = g.players;
        gameInstance.playerCount = g.playerCount;
        return gameInstance;
      })
      setGames(realGames);
    }
  }, []);

  const gameRows = [];
  if (games.length) {
    for (const [i, game] of games.entries()) {
      const max = game.max;
      const players = game.players;
      const playerDisplay = [];
      const name = game.name;

      for (let j = 0; j < 4; j++) {
        if (j < max) {
          playerDisplay.push(players[j] ? <td key={j}>{players[j].name.split('@')[0]}</td> : <Open key={j} />);
        }
        else {
          playerDisplay.push(<td key={j}></td>);
        }
      }

      gameRows.push(
        <tr key={i}>
          <td>{name}</td>
          {playerDisplay[0]}
          {playerDisplay[1]}
          {playerDisplay[2]}
          {playerDisplay[3]}
          <td>{
            playerDisplay.some(element => element.type === Open) ? 
            <Button className = "button" variant = "primary" onClick={() => joinCurrentGame(game)}>Join</Button> :
            ""
          }</td>
        </tr>
      );

    }
  } else {
    gameRows.push(
      <tr key='0'>
        <td colSpan='6'>There are no currently active games. Why not create one?</td>
      </tr>
    );
  }
  return (
    <main className="container-fluid bg-body text-center">
      <Create onCreate={(gameName, playerCount) => createGame(gameName, playerCount)} />
      <table className="table table-striped-columns table-body">
        <thead className="table-light">
          <tr>
            <th>Game</th>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Player 3</th>
            <th>Player 4</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody id='games'>
          {gameRows}
        </tbody>
      </table>
      <Button className="button" variant='danger' onClick={() => resetGames()}>
        Remove All Games(This is a placeholder)
      </Button>
    </main>
  );
}