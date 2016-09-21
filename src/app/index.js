import React from "react";
import {render} from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div id="game">
                <h2>Algebra 4 Kids</h2>
                <hr/>
                <div className="clearfix">
                    <Star />
                    <Button />
                    <Answer />
                </div>
                <Numbers />
            </div>
        );
    }
}

class Star extends React.Component {
    render() {
        var noOfStars = Math.floor(Math.random()*9)+1;

        var stars = [];
        for (var i = 0; i < noOfStars; i++) {
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            )
        }
        return (
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <div id="button-frame">
                <button className="btn btn-primary">=</button>
            </div>
        );
    }
}

class Answer extends React.Component {
    render() {
        return (
            <div id="answer-frame">
                <div className="well">
                    <input className="form-control" type="text"/>
                </div>
            </div>
        );
    }
}

class Numbers extends React.Component {
    render() {
        var nos = [];
        for (var i = 0; i < 9; i++) {
            nos.push(
                <div className="number">{i+1}</div>
            )
        }
        return (
            <div id="numbers-frame" className="well">
                {nos}
            </div>
        );
    }
}

render(
    <App />, 
    document.getElementById('container')
)