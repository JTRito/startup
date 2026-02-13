import React from 'react';
import './game.css'

export function Game() {
    return (
        <main className="container-fluid bg-body">
            <div className="d-flex justify-content-start pt-3">
                <div className="players text-start">
                    <span className="current-player d-block">
                        Player:
                        <span className="player-name">Mystery Player</span>
                    </span>

                    <ul className="notification list-unstyled mb-0">
                        <li className="turn-notification"><b>It's your turn!</b></li>
                        <li className="pass-notification"><span className="player4">John</span> finished his turn.</li>
                        <li className="pass-notification"><span className="player3">Jacob</span> finished his turn.</li>
                        <li className="time-notification"><span className="player2">Luke's</span> time is up!</li>
                    </ul>
                </div>
            </div>
            <div className="game h3 my-4 text-center">
                Game: <span id="game-title" font="Roboto">Terraforming Mars</span>
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
                    <tr>

                        <td className="player-name"><b>Mystery Player</b></td>
                        <td><b>1st</b></td>
                        <td><b>4:35</b></td>
                    </tr>
                    <tr>
                        <td className="player2">Luke</td>
                        <td>2nd</td>
                        <td>5:00</td>
                    </tr>
                    <tr>

                        <td className="player3">Jacob</td>
                        <td>3rd</td>
                        <td>5:00</td>
                    </tr>
                    <tr>

                        <td className="player4">John</td>
                        <td>4th</td>
                        <td>5:00</td>
                    </tr>
                </tbody>
            </table>

            <br />
            <br />

            <div className="controls-container d-flex flex-row align-items-center justify-content-center gap-5">
                <div className="d-flex justify-content-center gap-3 mt-4 flex-column">
                    <button type="button" className="btn btn-info btn-sm">+ Add Player</button>
                </div>
                <div className="d-flex justify-content-center gap-4 mt-4 flex-column">
                    <button className="btn btn-primary w-100 py-3 btn-lg fw-bold btn-lg ms-auto">End Turn</button>
                    <button className="btn btn-success btn-sm">Change Turn Order</button>
                </div>
                <div className="text-center d-flex justify-content-center flex-column">
                    <button className="btn btn-danger btn-sm mt-5 mb-3">Pause Timer</button>
                    <div className="input-group">
                        <button className="btn btn-primary btn-sm">+</button>
                        <input type="text" id="time" value="5:00" readOnly className="form-control text-center" style="width: 80px;" />
                        <button className="btn btn-primary btn-sm">-</button>
                    </div>
                    <small className="d-block mt-1">Change Time</small>
                </div>
            </div>

        </main >

  );
}