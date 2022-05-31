import React from 'react';
import styles from './Chess.module.scss';
import Board from './Board/Board';

export default function Chess(props) {
    return(<div>
        <h2>Chess</h2>
        <div className={styles.boardContainer}>
            <Board/>
        </div>
    </div>)
}