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
    console.log(available);

    for (let [i, value] of current.entries()) {
        squares.push(<Square
            key={i}
            value={frame[i]}
            color={available.neutral === value ? "white" : color}
            current={value}
            disabled={!(available.colored.includes(value) || available.neutral === value)}
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