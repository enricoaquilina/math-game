import React from "react";
import {render} from 'react-dom';

export class App extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            selectedNumbers: [], 
            noOfStars: (Math.floor(Math.random()*9)+1) 
        };
        // this.onChange = this.onChange.bind(this);

    }
    addNumber(clickedNumber) {
        this.setState({
            selectedNumbers : this.state.selectedNumbers.concat(69)
        })
        // if(this.state.selectedNumbers.indexOf(clickedNumber) == -1){
        //     this.setState(
        //         { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber) }
        //     );
        // }        
    }
    test(){
        this.setState({
            selectedNumbers : this.state.selectedNumbers.concat(1)
        })
    }
    removeNumber(clickedNumber){
        var selectedNos = this.state.selectedNumbers,
            indexOfNumber = selectedNos.indexOf(clickedNumber);

        selectedNos.splice(indexOfNumber, 1);
        this.setState(
            {selectedNumbers: selectedNos}
        );
    }
    render() {
        return (
            <div id="game">
                <h2>Algebra 4 Kids</h2>
                <hr/>
                <div className="clearfix">
                    <Star noOfStars={this.state.noOfStars} />
                    <Button />
                    <Answer selectedNumbers={this.state.selectedNumbers} removeNumber={this.removeNumber} />
                </div>
                <Numbers selectedNumbers={this.state.selectedNumbers} addNumber={this.test} />
            </div>
        );
    }
}

class Star extends React.Component {
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
        var className = "",
            nos = [], 
            selectedNos = this.props.selectedNumbers,
            removeNumber = this.props.removeNumber;
            
        {selectedNos.map(function(result) {
            className = "number selected-" + (selectedNos.indexOf(result)>=0); 
            nos.push(<span onClick={removeNumber.bind(null, result)} key={result}>{result}</span>);
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
    render() {
        var nos = [], 
            className = "", 
            selectedNos = this.props.selectedNumbers,
            addNumber = this.props.addNumber;


        for (var i = 1; i < 10; i++) {
            className = "number selected-" + (selectedNos.indexOf(i)>=0); 
            nos.push(
                <span className="{className}" onClick={addNumber.bind(this)} key={i}>{i}</span>
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