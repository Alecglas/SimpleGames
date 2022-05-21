import React from 'react';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import './Row.scss';

export default function Row() {
    let squares = []
    for (let i = 0; i < 12; i++){
        squares.push()
    }
    return(
        <div>{squares}</div>
    )
}