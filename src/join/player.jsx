import { PlayerRow } from "../game/playerRow";
import React from "react";
export class Player {
    constructor(name, num) {
        this.name = name;
        this.num = num;
        this.active = false;
        this.turnOrder = "";
        this.time = 0; 
    }

    toggleActive() {
        this.active = !this.active;
    }

    formatPlayerNum(){
        if (this.num === 1) {
            return "player-one";
        }
        if (this.num === 2) {
            return "player-two";
        }
        if (this.num === 3) {
            return "player-three"
        }
        if (this.num === 4) {
            return "player-four";
        }
    }

    setTurnOrder(turnOrder){
        this.turnOrder = turnOrder;
    }

    setTime(time){
        this.time = time;
    }

    display() {
        return (<PlayerRow playerName={this.name} activePlayer={this.active} turnOrder={this.turnOrder} time={this.time} num={this.num}/>)
    }
}