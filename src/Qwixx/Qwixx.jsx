import React, { useState, useReducer } from 'react';
import './Qwixx.scss';
import Row from './Row/Row';
import Dice from './Dice/Dice';

class Die {
    constructor(label) {
        this.label = label;
        this.value = Math.floor(Math.random()*6)+1;
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
        this.getScore();
    }

    getScore = () => {
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

class QGame {

    constructor() {
        this.config = {
            rows: 4,
            labels: ["red", "yellow", "green", "blue"]
        }

        this.board = {}
        this.dice = {}

        this.config.labels.forEach((label, i) => {
            const framing = (i < 2) ? 1 : -1;
            this.board[label] = new QRow(framing);
            this.dice[label] = new Die(label);
        });

        this.dice["n1"] = new Die("n1");
        this.dice["n2"] = new Die("n2");
    }


    mark = (row, num) => {
        console.log([row,num]);
        this.board[row].mark(num);
        this.rollDice();
    }

    rollDice = () => {
        console.log("rolling");
        for (let key in this.dice) {
            this.dice[key].roll();
        }
    }

    diceSums = () => {
        let sums = {}
        let n1 = this.dice["n1"].value;
        let n2 = this.dice["n2"].value;
        this.config.labels.forEach(key => {
            let die = this.dice[key].value;
            sums[key] = [n1+n2, die+n1, die+n2]
        });

        return sums;
    }

    available = () => {
        const sums = this.diceSums();
        for(let key in sums){
            //console.log(sums[key])
        }
        //console.log(sums)
        return sums;
    }
}

export default function Qwixx() {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [Game] = useState(new QGame());


    const handleClick = (row, num) => {
        Game.mark(row, num);
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
            row={Game.board[label]}
            available={Game.available()[label]}
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
        <button onClick={handleRoll}>Roll Dice</button>
        <h1>Game Message</h1>
    </div>)
}