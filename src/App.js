import React, { Component } from 'react';
import Tiles from './components/Tiles';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      myTurn: false,
      power: false,
      strictMode: false,
      startGame: false,
      simonSequence: [],
      playerSequence: []
    };
  }

  componentWillMount() {
    this.setState({
      simonSequence: this.generateRandomSequence()
    });
  }

  handleStartGame = () => {
    this.setState({
      startGame: true
    });
  }

  generateRandomSequence = () => {
    let randomArray = [];
    
    for(let i=0; i < 20 ; i++){
      randomArray[i] = Math.floor(Math.random() * 4) + 1;
    }
    return randomArray;
  }

  render() {
    return (
      <div className="App">
        <Tiles/>
        <button onClick={() => this.handleStartGame()}>Start!</button>
      </div>
    );
  }
}

export default App;
 