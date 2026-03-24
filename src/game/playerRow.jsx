import React from 'react';
import { Timer } from './timer';

export function PlayerRow(props) {

    const {playerName, activePlayer, time, num, turnOrder} = props;

    const formatPlayerNum = (i) => {
        if (i === 1) {
            return "player-one";
        }
        if (i === 2) {
            return "player-two";
        }
        if (i === 3) {
            return "player-three";
        }
        if (i === 4) {
            return "player-four";
        }
    }

    return (
        <>
            {activePlayer ?
                <tr>
                    <td className={formatPlayerNum(num)} > <b>{playerName.split('@')[0]}</b></td >
                    <td><b>{turnOrder}</b></td>
                    <Timer seconds={time} isActive={activePlayer} />
                </tr>
                :
                <tr>
                    <td className={formatPlayerNum(num)}> {playerName.split('@')[0]}</td>
                    <td>{turnOrder}</td>
                    <Timer seconds={time} isActive={activePlayer} />
                </tr>
            }
        </>
    )
}