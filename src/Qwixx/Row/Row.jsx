import React from 'react';
import './Row.scss';
import Square from '../Square/Square';

export default function Row(props) {
    const frame = props.row.frame;
    const current = props.row.row;
    const score = props.row.score;
    const available = props.available;
    const color = props.color;

    let squares = [];

    for (let [i, value] of current.entries()) {
        squares.push(<Square
            key={i}
            value={frame[i]}
            color={color}
            current={value}
            disabled={!available.includes(value)}
            onClick={(e) => {
                props.onClick(frame[i])
            }}
        />)
    }

    return(
        <div className="rowContainer">
            {squares}
            <div className="rowPoints">
            {score}
            </div>
        </div>
    )
}