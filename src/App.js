import React, { Component } from 'react';
import Tiles from './components/Tiles';
import Controller from './components/Controller';
import './App.css';

let greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

class App extends Component {
  constructor(){
    super();

    this.state = {
      player: false,
      power: false,
      strictMode: false,
      startGame: false,
      step: 0,
      playerStep: 0,
      simonSequence: []
    };
  }

  handlePower = () => {
    if(this.state.power === false) {
      this.setState({
        power: true
      });
    } else {
      this.setState({
        player: false,
        power: false,
        strictMode: false,
        startGame: false,
        step: 0,
        playerStep: 0,
        simonSequence: []
      });
    }
  }

  handleStrict = () => {
    if(this.state.strictMode === false) {
      this.setState({
        strictMode: true
      });
    } else {
      this.setState({
        strictMode: false
      })
    }
  }

  handleStartGame = () => {
    if(this.state.power === true && this.state.startGame === false) {
      this.randomClick();
      this.setState({
        startGame: true
      });

    }
  }

  randomClick = () => {
    let random = Math.floor(Math.random() * 4) + 1;
    let currentStep = this.state.step;
    let currentSequence = this.state.simonSequence.slice();

    currentSequence[currentStep] = random;
    currentStep++;

    this.setState({
      simonSequence: currentSequence,
      step: currentStep,
      player: true
    });

    switch (random) {
      case 1:
        greenSound.currentTime = 0;
        greenSound.play();
        break;
      case 2:
        redSound.currentTime = 0;
        redSound.play();
        break;
      case 3:
        yellowSound.currentTime = 0;
        yellowSound.play();
        break;
      case 4:
        blueSound.currentTime = 0;
        blueSound.play();
        break;
      default:
    }
  }

  render() {
    return (
      <div className="App">
        <Tiles/>
        <Controller 
          power={this.state.power} 
          strict={this.state.strictMode} 
          handlePower={this.handlePower} 
          handleStrict={this.handleStrict}
          handleStartGame={this.handleStartGame}/>
      </div>
    );
  }
}

export default App;
 