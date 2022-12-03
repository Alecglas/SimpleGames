import React from 'react';
import Square from '../Square/Square';
import styles from './Board.module.scss';

export default function Board(props) {

    let letters = "abcdefgh"
    let board = [];
    let colors = ["Thistle", "SeaGreen"]

    for(let x = 0; x < 8; x++){
        let row = [];
        
        for(let y = 8; y >= 1; y--){
            let color = colors[(x + y) % 2]
            let code = letters[x]+y;
            row.push(<Square
                key={code}
                label={code}
                color={color}
            />)
        }
        board.push(row)
    }

    return(
        <div className={styles.board}>
            {board.map(row => (
                <div>{row}</div>
            ))}
        </div>
    )
}