import React from "react";
import {render} from 'react-dom';


import { Answer } from './Answer';
import { Banner } from './Banner';
import { Button } from './Button';
import { Numbers } from './Numbers';
import { Star } from './Star';
import { Start } from './Start';


export class App extends React.Component {
     constructor() {
        super();
        this.state = {
            selectedNumbers: [], 
            noOfStars: this.generateStars(),
            redrawsLeft: 5,
            correct: null,
            usedNumbers: [],
            currentLevel: 1,
            lives: 3,
            gameOver: false,
            gameStarted: false,
            messageToShow: '',
            counter: 0,
            timeFormatted: '',
            intervalId: 0
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
            }, () => this.checkSumAvailability());
        }
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
            currentLevel: 1,
            timeFormatted: '',
            counter: 0,
            gameStarted: true
        })
        this.startCtr();
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
    calcHours = (e) => {
        return Math.floor(this.state.counter / 3600);
    }
    calcMinutes = (e) => {
        return Math.floor(this.state.counter / 60);
    }
    calcSeconds = (e) => {
        return this.state.counter % 60;
    }
    padLeft = (string, pad, length) => {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }
    incrementCtrAndFormatTime = (e) => {
        this.setState({
            counter: this.state.counter+1,
            timeFormatted:  this.padLeft(this.calcHours(), '0', 2) + ':' + 
                            this.padLeft(this.calcMinutes(), '0', 2) + ':' + 
                            this.padLeft(this.calcSeconds(), '0', 2)
        })
    }
    possibleCombinationSum = (arr, n) => {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }

        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
            var combinationSum = 0;
            for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    }
    startCtr = (e) => {
        return setInterval(this.incrementCtrAndFormatTime, 1000)
    }
    startGame = (e) => {
        this.setState({
            gameStarted: true,
            intervalId: this.startCtr()
        })
    }
    checkSumAvailability = (e) => {
        var redraws = this.state.redrawsLeft,
            usedNumbers = this.state.usedNumbers,
            noOfStars = this.state.noOfStars,
            possibleNumbers = [];

        for (var i = 1; i < 10; i++) {
            if(usedNumbers.indexOf(i) < 0) {
                possibleNumbers.push(i);
            }
        }
        
        if (redraws === 0 && 
            !this.possibleCombinationSum(possibleNumbers, noOfStars)) {
            this.setState({
                messageToShow: 'Game Over!(You did not have a valid combination for the number of stars generated!)',
                intervalId: clearInterval(this.state.intervalId),
                usedNumbers: [],
                selectedNumbers: [],
                gameOver: true,
                counter: 0,
                gameStarted: false,
                currentLevel: 0,
                noOfStars: 0,
                correct:null,
                timeFormatted: ''
            })
        }
    }    
    nextLevel = (e) => {
        if(this.state.usedNumbers.length == 8) {
            this.setState({
                messageToShow: 'Done! Time taken: ' + this.state.timeFormatted,
                intervalId: clearInterval(this.state.intervalId),
                usedNumbers: this.state.usedNumbers.concat(this.state.selectedNumbers),
                noOfStars: this.generateStars(),
                currentLevel: this.state.currentLevel += 1,
                correct: null,
                selectedNumbers: [],
                gameOver: true,
                counter: 0,
                timeFormatted: '',
                gameStarted: false
            })
        }else {
            this.setState({
                usedNumbers: this.state.usedNumbers.concat(this.state.selectedNumbers),
                noOfStars: this.generateStars(),
                currentLevel: this.state.currentLevel += 1,
                correct: null,
                selectedNumbers: []
            }, () => this.checkSumAvailability())
        }
        
    }
    render() {
        var noOfStars = this.state.noOfStars,
            selectedNumbers = this.state.selectedNumbers,
            correct = this.state.correct,
            currentLevel = this.state.currentLevel,
            lives = this.state.lives,
            counter = this.state.counter,
            timeFormatted = this.state.timeFormatted,
            health = [],
            gameOver = this.state.gameOver,
            gameStarted = this.state.gameStarted,
            bottomFrame, midFrame;

        for (var i = 0; i < lives; i++) {
            health.push(
                <span key={i} className="glyphicon glyphicon-heart"></span>
            )
        }
        if(!gameOver && gameStarted){
            bottomFrame = (
                <Numbers selectedNumbers = { this.state.selectedNumbers } 
                         addNumber = { this.addNumber } 
                         usedNumbers = { this.state.usedNumbers }
                         gameOver = { this.state.gameOver } />
            )
        }else if(gameOver && !gameStarted){
            bottomFrame = (
                <Banner gameOver = { this.state.gameOver } 
                        messageToShow = { this.state.messageToShow } 
                        restartGame = { this.restartGame } />
            )
        }
        if(!gameStarted && !gameOver){
            midFrame = (
                <Start startGame = { this.startGame }/>
            )
        }else if(gameStarted) {
            midFrame = (
                <div>
                    <Star noOfStars = { noOfStars } />
                    <div>
                        <Button correct = { correct } 
                                selectedNumbers = { selectedNumbers } 
                                verifyAnswer = { this.verifyAnswer }
                                nextLevel = { this.nextLevel } 
                                wrongAnswer = { this.wrongAnswer } 
                                redrawsLeft = { this.state.redrawsLeft } 
                                redraw = { this.redraw } />
                            <div>
                                <Answer selectedNumbers = { this.state.selectedNumbers } 
                                removeNumber = { this.removeNumber } />
                            </div>
                    </div>
                </div>
            )
        }
        return (
            <div id="game">
                <h2>Algebra 4 Kids</h2>
                Level {currentLevel} | Lives: {health}
                <br/>
                Time: {timeFormatted}
                <hr/>
                <div className="clearfix">
                    {midFrame}
                </div>
                {bottomFrame}
            </div>
        );
    }
}