import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Join } from './join/join';
import { Game } from './game/game';
import { AuthState } from './login/authState';


export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return <BrowserRouter>
        <div className="body bg-light text-dark">
            <header className="container-fluid bg-body">
                <nav className="navbar fixed-top navbar-light bg-light">
                    <div className="navbar-brand">BGTimer</div>
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="">Home</NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="join">
                                    Join
                                </NavLink>
                            </li>
                        )}
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="game">
                                    Game
                                </NavLink>
                            </li>
                        )}
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/game' element={<Game />} />
                <Route path='/join' element={<Join />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <div className="container-fluid">
                    <span className="text-reset">Jacob Unalp</span>
                    <a className="text-reset" href="https://github.com/JuanotheRito/startup">GitHub</a>
                </div>
            </footer>

        </div>
    </BrowserRouter>;
}

function NotFound() {
    return <main className="container-fluid bg-body text-center">404: Return to sender. Address unknown.</main>;
}

