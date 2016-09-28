import React from "react";
import {render} from 'react-dom';

export class Banner extends React.Component {
    constructor() {
        super();
    }
    render() {
        var messageToShow = this.props.messageToShow,
            gameOver = this.props.gameOver,
            nextRound = this.props.nextRound,
            restartGame = this.props.restartGame;

        return (
            <div id="banner-frame" className = "well text-center">
                <h2>{ messageToShow }</h2>
                <button className="btn btn-lg btn-success" onClick = { restartGame }>Restart</button>                
            </div>
        );
    }
}