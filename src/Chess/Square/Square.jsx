import React from 'react';
import styles from './Square.module.scss';

export default function Square(props) {
    return(
        <div className={styles.square} style={{backgroundColor: props.color}}>
            <img className={styles.piece} src={require('../assets/black/bishop.png')} alt=""/>
        </div>
    )
}