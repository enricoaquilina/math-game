import React from "react";
import {render} from 'react-dom';

export class App extends React.Component {
     constructor() {
        super();
        this.state = {
            selectedNumbers: [], 
            noOfStars: (Math.floor(Math.random()*9)+1),
            redrawsLeft: 205,
            correct: null,
            usedNumbers: [],
            currentLevel: 1,
            lives: 3,
            gameOver: false,
            messageToShow: ''
        };
    }
    addNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) == -1 &&
           this.state.usedNumbers.indexOf(clickedNumber) == -1) {
            this.setState(
                { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber) }
            );
        }        
    }
    removeNumber = (clickedNumber) => {
        var selectedNos = this.state.selectedNumbers,
            indexOfNumber = selectedNos.indexOf(clickedNumber);

        selectedNos.splice(indexOfNumber, 1);
        this.setState(
            {selectedNumbers: selectedNos}
        );
    }
    sumUpAnswers = (e) => {
        return this.state.selectedNumbers.reduce( (a,b) => a+b, 0);
    }
    verifyAnswer = (e) => {
        var correct = (this.sumUpAnswers() === this.state.noOfStars);
        this.setState({ correct: correct });
    }
    redraw = (e) => {
        if(this.state.redrawsLeft > 0){
            this.setState({
                redrawsLeft: this.state.redrawsLeft - 1,
                noOfStars: this.generateStars()
            })
        }
    }
    nextRound = (e) => {
        console.log('here');
        // this.setState({
            
        // })
    }
    restartGame = (e) => {
        this.setState({
            redrawsLeft: 5,
            noOfStars: this.generateStars(),
            usedNumbers: [],
            selectedNumbers: [],
            gameOver: false,
            messageToShow: '',
            lives: 3,
            correct: null,
            currentLevel: 1
        })
    }
    wrongAnswer = (e) => {
        if(this.state.lives > 0){
            this.setState({
                lives: this.state.lives - 1,
                noOfStars: this.generateStars(),
                selectedNumbers: [],
                correct: null
            })
        }
    }
    generateStars = (e) => {
        return (Math.floor(Math.random()*9)+1);
    }
    nextLevel = (e) => {
        if(this.state.usedNumbers.length == 8){
            this.setState({
                usedNumbers: this.state.usedNumbers.concat(this.state.selectedNumbers),
                noOfStars: this.generateStars(),
                currentLevel: this.state.currentLevel += 1,
                correct: null,
                selectedNumbers: [],
                gameOver: true,
                messageToShow: 'Done! You are awesome :)'
            })
        }
        if(this.state.usedNumbers.length < 8){
            this.setState({
                usedNumbers: this.state.usedNumbers.concat(this.state.selectedNumbers),
                noOfStars: this.generateStars(),
                currentLevel: this.state.currentLevel += 1,
                correct: null,
                selectedNumbers: []
            })
        }
        
    }
    render() {
        var noOfStars = this.state.noOfStars,
            selectedNumbers = this.state.selectedNumbers,
            correct = this.state.correct,
            currentLevel = this.state.currentLevel,
            lives = this.state.lives,
            health = [],
            gameOver = this.state.gameOver,
            bottomFrame;

        for (var i = 0; i < lives; i++) {
            health.push(
                <span key={i} className="glyphicon glyphicon-heart"></span>
            )
        }
        if(!gameOver){
            bottomFrame = (
                <Numbers selectedNumbers = { this.state.selectedNumbers } 
                         addNumber = { this.addNumber } 
                         usedNumbers = { this.state.usedNumbers }
                         gameOver = { this.state.gameOver } />
            )
        }else{
            bottomFrame = (
                <Banner gameOver = { this.state.gameOver } 
                        messageToShow = { this.state.messageToShow } 
                        nextRound = { this.nextRound } 
                        restartGame = { this.restartGame } />
            )
        }
        return (
            <div id="game">
                <h2>Algebra 4 Kids</h2>
                Level {currentLevel} | Lives: {health}
                <hr/>
                <div className="clearfix">
                    <Star noOfStars = { noOfStars } />
                    <Button correct = { correct } 
                            selectedNumbers = { selectedNumbers } 
                            verifyAnswer = { this.verifyAnswer }
                            nextLevel = { this.nextLevel } 
                            wrongAnswer = { this.wrongAnswer } 
                            redrawsLeft = { this.state.redrawsLeft } 
                            redraw = { this.redraw } />
                    <Answer selectedNumbers = { this.state.selectedNumbers } 
                            removeNumber = { this.removeNumber } />
                </div>
                {bottomFrame}
            </div>
        );
    }
}

class Star extends React.Component {
    constructor() {
        super();
    }
    render() {
        var stars = [],
            noOfStars = this.props.noOfStars;

        for (var i = 0; i < noOfStars; i++) {
            stars.push(
                <span key={i} className="glyphicon glyphicon-star"></span>
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

class Banner extends React.Component {
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
                <button className="btn btn-lg btn-success" onClick = { nextRound }>Continue</button>
                <button className="btn btn-lg btn-success" onClick = { restartGame }>Restart</button>                
            </div>
        );
    }
}

class Answer extends React.Component {
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

class Numbers extends React.Component {
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

render(
    <App />, 
    document.getElementById('container')
)