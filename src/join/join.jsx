import React from 'react';
import { useNavigate } from 'react-router-dom';
import './join.css';

import { Lobby } from './lobby';
import Button from 'react-bootstrap/Button'
import { Create } from './create';
import { Player } from './player';
import { Open } from './open';

export function Join({ userName, onGameChange }) {
  const [games, setGames] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('/api/games')
      .then((response) => response.json())
      .then((games) => {
        setGames(games);
      });
  }, []);

  async function resetGames() {
    fetch('/api/games/reset', {
      method: 'delete'
    })
      .catch(() => { })
      .finally(() => {
        setGames([]);
        localStorage.removeItem('games');
        localStorage.removeItem('currentGame');
        onGameChange("");
      })
  }

  async function joinCurrentGame(game) {
    const response = await fetch(`/api/game/${game.id}`, {
      method: 'put',
      body: JSON.stringify({ player: userName }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if (response?.status === 200 || response?.status === 204) {
      const updatedGames = await response.json(); 
      setGames(updatedGames);
    };

    /*const updatedGames = [...games];
    setGames(updatedGames);

    localStorage.setItem('games', JSON.stringify(updatedGames));
    localStorage.setItem('currentGame', JSON.stringify(game))

    onGameChange(game);

    navigate('/game');*/
  }

  async function createGame(gameName, playerCount) {
    const newGame = { name: gameName, playerCount: playerCount };

    const response = await fetch('/api/game', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newGame),
    });
    if (response?.status === 200 || response?.status === 204) {
      const updatedGames = await response.json(); 
      setGames(updatedGames);
    }
  }

  const gameRows = [];
  if (games.length) {
    for (const [i, game] of games.entries()) {
      const max = game.max;
      const players = game.players;
      const playerDisplay = [];
      const name = game.name;

      for (let j = 0; j < 4; j++) {
        if (j < max) {
          playerDisplay.push(players[j] ? <td key={j}>{players[j].split('@')[0]}</td> : <Open key={j} />);
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
              <Button className="button" variant="primary" onClick={() => joinCurrentGame(game)}>Join</Button> :
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