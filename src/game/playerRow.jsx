import React from 'react';
import { Timer } from './timer';

export function PlayerRow(props) {
    const [playerName, setPlayerName] = React.useState(props.playerName);
    const [activePlayer, setActivePlayer] = React.useState(props.activePlayer);
    const [turnOrder, setTurnOrder] = React.useState(props.turnOrder);
    const [time, setTime] = React.useState(props.time);
    const [playerNum, setPlayerNum] = React.useState(props.num);

    const formatPlayerNum = (i) => {
        if (i === 1) {
            return "player-one";
        }
        if (i === 2) {
            return "player-two";
        }
        if (i === 3) {
            return "player-three"
        }
        if (i === 4) {
            return "player-four";
        }
    }

    return (
        <>
            {activePlayer ?
                <tr>
                    <td className={formatPlayerNum(playerNum)} > <b>{playerName.split('@')[0]}</b></td >
                    <td><b>{turnOrder}</b></td>
                    <Timer seconds={time} isActive={activePlayer} />
                </tr>
                :
                <tr>
                    <td className={formatPlayerNum(playerNum)}> {playerName.split('@')[0]}</td>
                    <td>{turnOrder}</td>
                    <Timer seconds={time} isActive={activePlayer} />
                </tr>
            }
        </>
    )
}