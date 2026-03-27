
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
            return "player-three";
        }
        if (this.num === 4) {
            return "player-four";
        }
    }

    setTurnOrder(turnOrder){
        let result = ""; 

        if (turnOrder === 1 || turnOrder === "1st"){
            result = "1st";
        }
        if (turnOrder === 2 || turnOrder === "2nd"){
            result = "2nd";
        }
        if (turnOrder === 3 || turnOrder === "3rd") {
            result = "3rd";
        }
        if (turnOrder === 4 || turnOrder === "4th") {
            result = "4th";
        }
        this.turnOrder = result;
    }

    setTime(time){
        this.time = time;
    }
}