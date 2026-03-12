import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './game.css';
import { PlayerRow } from './playerRow';
import { Player } from '../join/player';
import { Timer } from './timer';
import { Lobby } from '../join/lobby';
import Button from 'react-bootstrap/Button'

export function Game({ userName, currentGame, onGameChange }) {
    React.useEffect(() => {
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

    if (!currentGame) {
        return (
            <main id="gameState" className="container-fluid bg-body">
                <div className="game h3 my-4 text-center">
                    <b>You aren't currently part of a game. Join one to get started!</b>
                </div>
            </main>
        )
    }

    let time = 60 * 5;
    const playerArray = [];
    let user = new Player(null, null);
    let color = null;
    let gameStart = false;
    let currentPlayer = null;
    let nextPlayer = null;

    //Placeholder Code for testing
    if (currentGame && Array.isArray(currentGame.players)) {
        for (const player of currentGame.players) {
            if (player) {
                playerArray.push(player);
            }
        }
        currentGame.setTime(time);
        user = playerArray.find(obj => obj.name === userName);
        color = user.formatPlayerNum()
    }
    //End of Placeholder

    const displayAll = (a) => {
        const out = []
        for (const obj of a) {
            out.push(obj.display());
        }
        return out;
    }

    const startGame = () => {

    }


    return (
        <main id="gameState" className="container-fluid bg-body">
            <div className="d-flex justify-content-start pt-3">
                <div className="players text-start">
                    <span className="current-player d-block">
                        Player:
                        <span className={color}>{userName.split('@')[0]}</span>
                    </span>

                    <ul className="notification list-unstyled mb-0">
                        <li className="turn-notification"><b>It's your turn!</b></li>
                        <li className="pass-notification"><span className="player-four">John</span> finished his turn.</li>
                        <li className="pass-notification"><span className="player-three">Jacob</span> finished his turn.</li>
                        <li className="time-notification"><span className="player-two">Luke's</span> time is up!</li>
                    </ul>
                </div>
            </div>
            <div className="game h3 my-4 text-center">
                Game: <span id="game-title" style={{ fontFamily: 'Roboto' }}>Terraforming Mars</span>
            </div>
            <table className="table table-striped-columns table-body">
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Turn Order</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {displayAll(playerArray)}
                </tbody>
            </table>

            <br />
            <br />

            <div className="controls-container d-flex flex-row align-items-center justify-content-center gap-5">
                <div className="d-flex justify-content-center gap-3 mt-4 flex-column">
                    <Button className="Button mt-5 mb-3"
                        variant='danger'
                        size='m'
                        onClick={() => null}
                    >Pause Game</Button>
                </div>
                <div className="d-flex justify-content-center gap-4 mt-4 flex-column">

                    <Button className="Button w-100 py-3 fw-bold ms-auto"
                        variant='primary'
                        size='lg'
                        onClick={() => null}
                    >
                        {gameStart ? 'End Turn' : 'Start Game'}
                    </Button>
                    <Button className="Button"
                        variant='success'
                        size='sm'
                        onClick={() => null}
                    >Set Turn Order</Button>
                </div>
                <div className="text-center d-flex justify-content-center flex-column">
                    

                    <div className="input-group">
                        <Button className="Button" variant="primary" size="sm">+</Button>
                        <input type="text" id="time" value="5:00" readOnly className="form-control text-center" style={{ width: '80px' }} />
                        <Button className="Button" variant='primary' size='sm'>-</Button>
                    </div>
                    <Button className="Button d-block mt-1"
                        variant='primary'
                        size='sm'
                        onClick={() => null}>
                        Change Time</Button>
                </div>
            </div>

        </main >

    );
}