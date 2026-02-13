import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-body text-center">
      <h1>Welcome to BGTimer</h1>
      <form method="get" action="join">
        <div className="input-group mb-3">
          <span className="input-group-text">Email</span>
          <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Password</span>
          <input className="form-control" type="password" placeholder="password" />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
        <button className="btn btn-secondary" type="submit">Register</button>
      </form>

      <div className="card mb-3" id="featured-game">
        <div className="row g-0">
          <div id="picture" className="col-md-4">
            <img src="spirit_island.webp" className="img-fluid rounded-start" alt="Cover of Spirit Island"></img>
          </div>
          <div className="col-md-8 d-flex flex-column">
            <div id="featured-header" className="bg-light">
              <h2><b>Featured Game</b></h2>
            </div>
            <div id="featured-title">
              <h3><b>Spirit Island</b></h3>
            </div>
            <ol className="justify-content-between mb-0 d-flex flex-column flex-grow-1 list-unstyled py-3" id="game-facts">
              <li><b>BGG Ranking: 11</b></li>
              <li><b>BGG Rating: 8.3</b><br></br></li>
              <li><b>Type: Co-op Strategy</b><br></br></li>
              <li><b>Player Count: 1 - 4</b><br></br></li>
              <li><b>Best At: 2</b><br></br></li>
              <li><b>Play Time: 90 - 120 Min</b><br></br></li>
              <li><b>Recommended Age: 14+</b><br></br></li>
              <li><b>Complexity Rating: Very High</b></li>
            </ol>
          </div>
        </div>
      </div>

    </main>
  );
}