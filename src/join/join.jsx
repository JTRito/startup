import React from 'react';

export function Join() {
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
      <tbody>
        <tr>
          <td>Ark Nova</td>
          <td>Annie</td>
          <td>Jeff</td>
          <td></td>
          <td></td>
          <td>Full</td>
        </tr>
        <tr>
          <td>Terraforming Mars</td>
          <td>Jacob</td>
          <td>John</td>
          <td>Luke</td>
          <td className="open">Open Spot</td>
          <td className="join">
            <form method="get" action="game">
              <button className="btn btn-primary" type="submit">Join</button>
            </form>
          </td>
        </tr>
        <tr>
          <td>Wingspan</td>
          <td>Thomas</td>
          <td>Elijah</td>
          <td>Henry</td>
          <td>Joseph</td>
          <td>Full</td>
        </tr>
      </tbody>
    </table>
  </main>
  );
}