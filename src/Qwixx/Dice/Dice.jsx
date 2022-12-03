import React from 'react';
import './Dice.scss';

export default function Dice(props) {
    return(
        <div className={`${props.color} dice`}>
            {props.value}
        </div>
    )
}