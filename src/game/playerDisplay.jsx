import React from "react";

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
            out.push(obj.display());
        }
        return out;
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