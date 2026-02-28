import React from 'react';

import Button from 'react-bootstrap/Button'


export function Create(props) {
    const [gameName, setGameName] = React.useState('');
    const [playerCount, setPlayerCount] = React.useState(0);


    async function setGame() {
        localStorage.setItem('gameName', gameName);
        localStorage.setItem('playerCount', playerCount)
        props.onCreate(gameName, playerCount);
    }

    return (
        <div>
            <div className='input-group mb-3'>
                <span className='input-group-text'>Game Name</span>
                <input className='form-control' type='text' value={gameName} onChange={(e) => setGameName(e.target.value)} placeholder='Game Title' />
            </div>
            <div className='input-group mb-3'>
                <span className='input-group-text'>Player Count</span>
                <select className='form-select' value={playerCount} onChange={(e) => setPlayerCount(Number(e.target.value))}>
                    <option value=''> # of players</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <Button className="button" variant='primary' onClick={() => setGame()} disabled={!gameName || !playerCount}>
                Create
            </Button>
        </div>
    )
}