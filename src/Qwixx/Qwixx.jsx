import React, { useState, useReducer } from 'react';
import './Qwixx.scss';
import Row from './Row/Row';
import Dice from './Dice/Dice';

class Die {
    constructor(label) {
        this.label = label;
        //this.value = Math.floor(Math.random()*6)+1;
        this.value = 0;
    }

    roll() {
        this.value = Math.floor(Math.random()*6)+1;
    }
}

class QRow {
    constructor(framing) {
        let frame = [2,3,4,5,6,7,8,9,10,11,12];
        this.frame = framing === -1 ? frame.reverse() : frame;
        this.row = [...frame];
        this.score = 0;
    }

    mark = (num) => {
        let index = this.row.indexOf(num);
        if(index === -1) return index;
        for(let i = 0; i < index; i++){
            if(this.row[i] !== 'O'){
                this.row[i] = 'X';
            }
        }
        this.row[index] = 'O';
        this.setScore();
    }

    setScore = () => {
        this.score = 0;
        let counter = 1;
        this.row.forEach(cell => {
            console.log(this.score);
            if(cell === "O") {
                this.score += counter;
                counter += 1;
            }
        })
    }
}

class QPlayer {

    constructor(config) {
        this.scoreCard = {};
        config.labels.forEach((label, i) => {
            const framing = (i < 2) ? 1 : -1;
            this.scoreCard[label] = new QRow(framing);
        });
    }

    mark = (row, num) => {
        const diceSums = this.diceSums;
        this.scoreCard[row].mark(num);

        if (num != diceSums.n) {
            this.canMark = false;
        } else {
            this.diceSums.n = 0;
        }
        this.canRoll = true;
    }
}

class QGame {

    constructor() {
        this.config = {
            players: 2,
            rows: 4,
            labels: ["red", "yellow", "green", "blue"]
        }

        this.players = {}
        this.dice = {}
        this.diceSums = {}
        this.canMark = false;
        this.canRoll = true;

        for(let i = 0; i < this.config.players; i++){
            this.players[i] = new QPlayer(this.config);
        }

        this.config.labels.forEach((label, i) => {
            this.dice[label] = new Die(label);
        });
        this.dice["n1"] = new Die("n1");
        this.dice["n2"] = new Die("n2");
    }




    rollDice = () => {
        console.log("rolling");
        for (let key in this.dice) {
            this.dice[key].roll();
        }
        this.getDiceSums();
        this.canMark = true;
        this.canRoll = false;
    }

    getDiceSums = () => {
        let sums = {}
        let n1 = this.dice["n1"].value;
        let n2 = this.dice["n2"].value;
        sums.n = n1+n2;
        this.config.labels.forEach(key => {
            let die = this.dice[key].value;
            sums[key] = [die+n1, die+n2];
        });

        this.diceSums = sums;
    }

    mark = (player, row, num) => {
        const diceSums = this.diceSums;
        this.players[player].scoreCard[row].mark(num);

        if (num != diceSums.n) {
            this.canMark = false;
        } else {
            this.diceSums.n = 0;
        }
        this.canRoll = true;
    }

    available = (player, label) => {
        let diceSums = this.diceSums;

        let sums = {
            neutral: 0,
            colored: []
        }

        if (!this.canMark) return sums;
        
        const row = this.players[player].scoreCard[label];

        sums.neutral = diceSums.n;
        sums.colored = diceSums[label]

        if(row.score < 15){
            const finisher = row.frame[row.frame.length-1];
            sums.neutral = sums.neutral === finisher ? 0 : sums.neutral;
            sums.colored = sums.colored.filter(num => num !== finisher);
        }

        
        console.log(sums)
        return sums;
    }
}

export default function Qwixx() {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [Game] = useState(new QGame());


    const handleClick = (row, num) => {
        Game.mark(0, row, num);
        forceUpdate();
    }


    const handleRoll = () => {
        console.log("handling roll");
        Game.rollDice();
        forceUpdate();
    }

    let rows = [];
    Game.config.labels.forEach((label) => {
        rows.push(<div className="rowContainer">
        <Dice
            key={`${label}-dice`}
            color={label}
            value={Game.dice[label].value}
        />

        <Row
            key={`${label}-row`}
            color={label}
            row={Game.players[0].scoreCard[label]}
            available={Game.available(0, label)}
            onClick={(n) => {
                handleClick(label, n);
            }}
        />
        </div>);
    });

    let dice = [];

    dice.push(<Dice
        key="n1-dice"
        value={Game.dice["n1"].value}
    />)
    dice.push(<Dice
        key="n2-dice"
        value={Game.dice["n2"].value}
    />)

    return (<div>
        <h2>Qwixx</h2>
        <div className="boardContainer">
            <div className="diceContainer">
            {dice}
            </div>
            {rows}
        </div>
        <button disabled={!Game.canRoll} onClick={handleRoll}>Roll Dice</button>
        <h1>Game Message</h1>
    </div>)
}