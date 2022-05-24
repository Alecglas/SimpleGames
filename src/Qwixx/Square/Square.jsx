import React from 'react';
import './Square.scss';

export default function Square(props) {
    return(
        <div className="square">
            <button 
                className={`${props.color} cell ${props.current}`}
                disabled={props.disabled}
                onClick={props.onClick}
            >
                {props.value}
            </button>
        </div>
    )
}