import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return <div className="body bg-light text-dark">
        <header className="container-fluid bg-body">
            <nav className="navbar fixed-top navbar-light bg-light">
                <a className="navbar-brand" href="#">BGTimer</a>
                <menu className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="join.html">Join</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="game.html">Game</a>
                    </li>
                </menu>
            </nav>
        </header>

        <main>App Components Go here</main>

        <footer>
            <div className="container-fluid">
                <span className="text-reset">Jacob Unalp</span>
                <a className="text-reset" href="https://github.com/JuanotheRito/startup">GitHub</a>
            </div>
        </footer>

    </div>;
}