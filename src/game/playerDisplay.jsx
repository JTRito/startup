import React from "react";
import { PlayerRow } from "./playerRow";

export function PlayerDisplay({ orderArray, playerArray }) {
    const displayAll = (a, b) => {
        const result = []
        for (const obj of a) {
            if (obj) {
                result.push(obj);
            }
        }
        for (const obj of b) {
            const isInArray = result.some(p => p.name === obj.name);
            if (!isInArray) {
                result.push(obj);
            }
        }
        const out = [];
        for (const obj of result) {
            out.push(display(obj));
        }
        return out;
    };

    const display = (i) => {
        return (<PlayerRow
            key={i.num}
            playerName={i.name} 
            activePlayer={i.active} 
            time={i.time}
            num={i.num} 
            turnOrder={i.turnOrder}
        />)
    }

    return (
        <table className="table table-striped-columns table-body">
            <thead>
                <tr>

                    <th>Name</th>
                    <th>Turn Order</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {displayAll(orderArray, playerArray)}
            </tbody>
        </table>
    )
}