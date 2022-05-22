import React, { useState, useReducer, useEffect } from 'react';
import './Qwixx.scss';
import Row from './Row/Row';
import Dice from './Dice/Dice';
/*const createDice = () => {
    let values = [0,0,0,0,0,0]

    const roll = () => {
        const arr = Array.from({length: 6}, () => Math.floor(Math.random()*6)+1)
        arr.forEach((v,i) => {
            values[i] = v;
        });
    }

    return {
        values: values,
        roll: roll
    }
}*/

class Die {
    constructor(label) {
        this.label = label
        this.value = Math.floor(Math.random()*6)+1;
    }

    roll() {
        this.value = Math.floor(Math.random()*6)+1;
    }
}

const createRow = () => {
    let frame = [2,3,4,5,6,7,8,9,10,11,12];
    let row = [...frame];

    const mark = (num) => {
        let index = row.indexOf(num);
        if(index === -1) return index;
        for(let i = 0; i < index; i++){
            if(row[i] !== 'O'){
                row[i] = 'X';
            }
        }
        row[index] = 'O';
    }

    return {
        frame: frame,
        row: row,
        mark: mark
    }
}

const createGame = () => {

    const config = {
        rows: 4,
        labels: ["red", "yellow", "green", "blue"]
    }

    const board = {}
    const dice = []
    config.labels.forEach((label, i) => {
        board[label] = createRow();
        dice.push(new Die(label));
    });

    dice.push(new Die("white"));
    dice.push(new Die("white"));

    const mark = (row, num) => {
        console.log([row,num]);
        board[row].mark(num);
    }

    const rollDice = () => {
        console.log("rolling");
        for(let i = 0; i < 6; i++){
            dice[i].roll();
        }
    }

    return {
        config: config,
        board: board,
        dice: dice,
        roll: rollDice,
        mark: mark
    }
}

export default function Qwixx() {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [Game] = useState(createGame());


    const handleClick = (row, num) => {
        Game.mark(row, num);
        forceUpdate();
    }


    const handleRoll = () => {
        console.log("handling roll");
        Game.roll();
        forceUpdate();
    }

    let rows = [];
    Game.config.labels.forEach((label) => {
        rows.push(<Row
            key={label}
            value={label}
            row={Game.board[label]}
            onClick={(n) => {
                handleClick(label, n);
            }}
        />)
    });

    let dice = [];
    Game.dice.forEach((d, i) => {
        dice.push(<Dice
            key={i}
            value={d.value}
        />)
    })


    return (<div>
        <h2>Qwixx</h2>
        <div className="boardContainer">
            {rows}
        </div>
        <button onClick={handleRoll}>Roll Dice</button>
        <div className="diceContainer">
            {dice}
        </div>
    </div>)
}