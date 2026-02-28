import { Player } from "./player"

export class Game {
    
    constructor(name, max) {
        this.name = name;
        this.max = max;
        this.players = new Array(max);
        this.playerCount = 0;
    }

    joinGame(userName) {
        const player = new Player(userName);
        this.players[this.playerCount] = player;
        this.playerCount += 1;
    }
}