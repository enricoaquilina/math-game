import React from "react";
import {render} from 'react-dom';

export class Answer extends React.Component {
    constructor() {
        super();
    }
    render() {
        var className = "",
            nos = [], 
            selectedNos = this.props.selectedNumbers,
            removeNumber = this.props.removeNumber;
            
        {selectedNos.map(function(result, i) {
            className = "number selected-" + (selectedNos.indexOf(result)>=0); 
            nos.push(<span onClick={ removeNumber.bind(null, result) } key={i}>{result}</span>);
        })}


        return (
            <div id="answer-frame">
                <div className="well">
                    {nos}
                </div>
            </div>
        );
    }
}