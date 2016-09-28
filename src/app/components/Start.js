import React from "react";
import {render} from 'react-dom';

export class Start extends React.Component {
    constructor() {
        super();
    }
    render() {
        var startGame = this.props.startGame;

        return (
            <div id="start-frame" className="well">
                Good luck and enjoy the game!
                <br/>
                <button className="btn btn-success" onClick = { startGame }>
                    Start!
                </button>
            </div>
        );
    }
}