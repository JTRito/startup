import React from 'react';
import './join.css';

import { Player } from './player';
import { Open } from './open';

export function Join() {
  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    const gamesText = localStorage.getItem('games');
    if (gamesText) {
      setGames(JSON.parse(gamesText))
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
          playerDisplay.push(players[j] ? <td key={j}>{players[j].name.split('@')[0]}</td> : <Open  key={j}/>);
        }
        else {
          playerDisplay.push(<td key={j}>{Player.Closed.name}</td>);
        }
      }

      gameRows.push(
        <tr key={i}>
          <td>{name}</td>
          {playerDisplay[0]}
          {playerDisplay[1]}
          {playerDisplay[2]}
          {playerDisplay[3]}
        </tr>
      );

    }
  } else {
    gameRows.push(
      <tr key = '0'>
        <td colSpan = '4'>There are no currently active games. Why not create one?</td>
      </tr>
    );
  }
  return (
    <main className="container-fluid bg-body text-center">
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
    </main>
  );
}