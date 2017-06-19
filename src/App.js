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

  handlePlayer = (tile) => {
    if(!this.state.player) return;
    let currentSequence = this.state.simonSequence.slice();
    let currentPlayerStep = this.state.playerStep;

    this.playSound(tile);

    if(tile !== currentSequence[currentPlayerStep]) {
      console.log('You are wrong :(');
      // Do some animation to inform the user that he is wrong
      // if we are not in strict mode, replay the sequence to the user
      if(!this.state.strictMode) {
        console.log('NOT STRICT','replay the sequence again');
      } else {
        // we are in strict mode, reset the steps, the game resets and starts again
        console.log('STRICT','reset game, start all over');
      }
    } else if (tile === currentSequence[currentPlayerStep] && currentPlayerStep < currentSequence.length - 1) {
      console.log('correct step!');
      // we need to promote the step if user click on right tile
      this.setState({
        playerStep: currentPlayerStep + 1
      });

    } else if (tile === currentSequence[currentPlayerStep] && currentPlayerStep === currentSequence.length - 1) {
      console.log('correct! add new random tile :)')
      // if the user accomplished correct sequence replay all the sequence + new step
      this.setState({
        player: false,
        playerStep: 0
      });
      this.replaySequence();
    }
  }

  playSound = (tileNumber) => {
    switch (tileNumber) {
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

  replaySequence = () => {
    let currentSequence = this.state.simonSequence.slice();
    let currentPlayerStep = this.state.playerStep;
    currentSequence.forEach(this.playSound);
    this.randomClick();
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

    this.playSound(random);

  }

  render() {
    return (
      <div className="App">
        <Tiles handlePlayer={this.handlePlayer}/>
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
 