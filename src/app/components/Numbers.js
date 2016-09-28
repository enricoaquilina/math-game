import React from "react";
import {render} from 'react-dom';

export class Numbers extends React.Component {
    constructor() {
        super();
    }
    render() {
        var nos = [], 
            className = "", 
            selectedNos = this.props.selectedNumbers,
            usedNumbers = this.props.usedNumbers,
            addNumber = this.props.addNumber,
            gameOver = this.props.gameOver;

        for (var i = 1; i < 10; i++) {
            var used = (selectedNos.indexOf(i)>=0) || (usedNumbers.indexOf(i)>=0);
            className = "number selected-" + used; 
            nos.push(
                <span className={className} onClick={ addNumber.bind(null, i) } key={i}>{i}</span>
            )
        }

        return (
            <div id="numbers-frame" className="well" disabled = { gameOver }>
                {nos}
            </div>
        );
    }
}