import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './game.css';
import { PlayerRow } from './playerRow';
import { Player } from '../join/player';
import { Timer } from './timer';
import { Lobby } from '../join/lobby';
import Button from 'react-bootstrap/Button'
import { TimeChanger } from './timeChanger';
import { TurnChanger } from './turnChanger';
import { PlayerDisplay } from './playerDisplay';

export function Game({ userName, currentGame, onGameChange }) {

    const [time, setTime] = React.useState((60 * 5));
    const [refcount, refresh] = React.useState(0);
     
    let turnOrderArray = new Array(4)

    const formatTurnOrder = (t) => {
        let result = 0;

        if (t === "1st") {
            result = 1;
        }
        if (t === "2nd") {
            result = 2;
        }
        if (t === "3rd") {
            result = 3;
        }
        if (t === "4th") {
            result = 4;
        }

        return result;
    }

    const rehydrate = (na, nu, t) => {
        const player = new Player(na, nu);
        const tn = formatTurnOrder(t);
        player.setTurnOrder(tn);
        if (tn > 0) {
            turnOrderArray[tn - 1] = player;
        }
        return player;
    };

    React.useEffect(() => {
        const currentGameText = localStorage.getItem('currentGame');
        if (currentGameText) {
            const g = JSON.parse(currentGameText);
            const realGame = new Lobby(g.name, g.max);
            realGame.players = Array.isArray(g.players)
                ? g.players.map(p => p ? rehydrate(p.name, p.num, p.turnOrder) : null)
                : new Array(g.max).fill(null);
            realGame.playerCount = g.playerCount;

            onGameChange(realGame);
        }
    }, []);

    /*React.useEffect(() => {
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
    }, [])*/

    if (!currentGame) {
        return (
            <main id="gameState" className="container-fluid bg-body">
                <div className="game h3 my-4 text-center">
                    <b>You aren't currently part of a game. Join one to get started!</b>
                </div>
            </main>
        )
    }

    const changeTime = (newTime) => { setTime(newTime) }


    const playerArray = [];
    let user = new Player(null, null);
    let color = null;
    let gameStart = false;
    let playerDisplay = <PlayerDisplay orderArray={turnOrderArray} playerArray ={playerArray}/>;
    let currentPlayer = null;
    let nextPlayer = null;

    React.useEffect(() => {
        playerDisplay = <PlayerDisplay orderArray={turnOrderArray} playerArray = {playerArray}/>;
    }, [turnOrderArray, playerArray])

    const isAvailable = (t) => {
        if (turnOrderArray[t-1]) {
            return false;
        }
        else{
            return true;
        }
    }

    const setTurnOrder = (p, t) => {
        if (isAvailable(t)) {
            p.setTurnOrder(t);
            turnOrderArray[t - 1] = p;
        }
    }

    //Placeholder Code for testing
    if (currentGame && Array.isArray(currentGame.players)) {
        for (const player of currentGame.players) {
            if (player) {
                player.setTime(time);
                playerArray.push(player);
            }
        }
        user = playerArray.find(obj => obj.name === userName);
        color = user.formatPlayerNum()
        /*let turnOrder = 1; 
        for (const player of playerArray){
            if (user.name !== player.name){
                setTurnOrder(player, turnOrder)
                turnOrder++;
                if (turnOrder ==2){
                    turnOrder++;
                }
            }
        }*/
         
    }
    //End of Placeholder

    



    const displayAll = (a, b) => {
        const result = []
        for (const obj of a) {
            if (obj) {
                result.push(obj);
            } 
        }
        for (const obj of b){
            const isInArray = result.some(p => p.name === obj.name);
            if (!isInArray){
                result.push(obj);
            }
        }
        const out = [];
        for (const obj of result){
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
            {playerDisplay}

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
                    <TurnChanger onChange={(t) => {
                        setTurnOrder(user, t);
                        refresh(refcount+1);
                        }} checker={(t) => isAvailable(t)}/>
                </div>

                <TimeChanger time={time} onSubmit={(i) => changeTime(i)} />
            </div>

        </main >

    );
}