import React from 'react';
import { useNavigate } from 'react-router-dom';
import './join.css';

import { Lobby } from './lobby';
import Button from 'react-bootstrap/Button'
import { Create } from './create';
import { Player } from './player';
import { Open } from './open';

export function Join({ userName, onGameChange}) {
  const [games, setGames] = React.useState([]);
  const navigate = useNavigate();

  function resetGames() {
    localStorage.removeItem('games');
    localStorage.removeItem('currentGame');
    setGames([]);
    onGameChange("");
  }

  function joinCurrentGame(game){
    game.joinGame(userName);

    const updatedGames = [...games]; 
    setGames(updatedGames);

    localStorage.setItem('games', JSON.stringify(updatedGames));
    localStorage.setItem('currentGame', JSON.stringify(game))

    onGameChange(game);

    navigate('/game');
  }

  function createGame(gameName, playerCount) {
    const game = new Lobby(gameName, playerCount);

    game.joinGame(userName);
    game.joinGame("Luke");
    game.joinGame("Jacob");
    game.joinGame("John");

    game.players.find(player => player.name === "Luke").setTurnOrder(1);
    game.players.find(player => player.name === "Jacob").setTurnOrder(2);
    game.players.find(player => player.name === "John").setTurnOrder(4);

    const newGamesList = [...games, game];
    setGames(newGamesList);

    const jsonGames = JSON.stringify(newGamesList);
    localStorage.setItem('games', jsonGames);
    localStorage.setItem('currentGame', JSON.stringify(game));

    onGameChange(game);
    navigate('/game');
  }

  React.useEffect(() => {
    const gamesText = localStorage.getItem('games');
    if (gamesText) {
      const plainGames = JSON.parse(gamesText);
      const realGames = plainGames.map(g => {
        const gameInstance = new Lobby(g.name, g.max);
        gameInstance.players = g.players.map(p => p ? new Player(p.name, p.num) : null);
        gameInstance.playerCount = g.playerCount;
        return gameInstance;
      })
      setGames(realGames);
    }
    const currentGameText = localStorage.getItem('currentGame');
    if (currentGameText) {
      const g = JSON.parse(currentGameText);
      const realGame = new Lobby(g.name, g.max);
      realGame.players = Array.isArray(g.players) 
        ? g.players.map(p => p ? new Player(p.name, p.num) : null)
        : new Array(g.max).fill(null);
      realGame.playerCount = g.playerCount;

      onGameChange(realGame);
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