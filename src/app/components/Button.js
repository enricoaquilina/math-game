import React from "react";
import {render} from 'react-dom';

export class Button extends React.Component {
    constructor() {
        super();
    }
    render() {
        var button,
            numberDisabled, redrawDisabled,
            correct = this.props.correct,
            verifyAnswer = this.props.verifyAnswer,
            selectedNumbers = this.props.selectedNumbers,
            nextLevel = this.props.nextLevel,
            wrongAnswer = this.props.wrongAnswer,
            redrawsLeft = this.props.redrawsLeft,
            redraw = this.props.redraw;

        numberDisabled = (selectedNumbers.length === 0);

        redrawDisabled = (redrawsLeft === 0);

        switch(correct) {
            case true:
                button = (
                    <button className="btn btn-success" onClick = { nextLevel }>
                        <span className="glyphicon glyphicon-ok">
                    </span>
                    </button>
                )
                break;
            case false:
                button = (
                    <button className="btn btn-danger" onClick = { wrongAnswer }>
                        <span className="glyphicon glyphicon-remove">
                    </span>
                    </button>
                )
                break;
            default:
                button = (
                    <button className="btn btn-primary" onClick={ verifyAnswer } disabled = { numberDisabled }>
                    =
                    </button>
                )
                break;
        }
        
        return (
            <div id="button-frame">
                {button}
                <br/>
                <br/>
                <span className="glyphicon glyphicon-refresh btn btn-warning" onClick={ redraw.bind() } disabled = { redrawDisabled }>
                    {redrawsLeft}
                </span>
            </div>
        );
    }
}
