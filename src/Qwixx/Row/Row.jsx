import React from 'react';
import './Row.scss';
import Square from '../Square/Square';

export default function Row(props) {
    const frame = props.row.frame;
    const current = props.row.row;

    let squares = [];
    let pts = 0;

    for (let [i, value] of current.entries()) {
        squares.push(<Square
            key={i}
            value={frame[i]}
            current={value}
            onClick={(e) => {
                props.onClick(frame[i])
            }}
        />)
    }

    let bonus = 1;
    current.forEach((cell) => {
        if(cell === "O") {
            pts += bonus;
            bonus += 1;
        }
    });

    return(
        <div className={`rowContainer ${props.value}`}>
            {squares}
            <div className="rowPoints">
                {pts}
            </div>
        </div>
    )
}