import React from 'react';
import './Square.scss';

export default function Square(props) {
    return(
        <div className="square">
            <button 
                className={`cell ${props.current}`}
                onClick={props.onClick}
            >
                {props.value}
            </button>
        </div>
    )
}