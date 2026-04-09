import { Player } from "./player"

export class Lobby {

    constructor(name, max, id) {
        this.name = name;
        this.max = max;
        this.id = id;
        this.players = new Array(max);
        this.playerCount = 0;
        this.turnOrderArray = new Array(max);
    }

    joinGame(userName) {
        const player = new Player(userName, this.playerCount + 1);
        this.players[this.playerCount] = player;
        this.playerCount += 1;
    }

    setTime(time) {
        for (const player of this.players) {
            if (player && typeof player.setTime === 'function') {
                player.setTime(time);
            } else {
                console.log("failed to set time for a player")
            }
        }
    }

    setTurnOrderArray(turnOrderArray){
        this.turnOrderArray = turnOrderArray;
    }
}