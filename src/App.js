import React, { Component } from 'react';
import Tiles from './components/Tiles';
import Controller from './components/Controller';
import ModalBox from './components/ModalBox';
import './App.css';

let greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

const customStyles = {
  content : {
    top          : '50%',
    left         : '50%',
    right        : 'auto',
    bottom       : 'auto',
    marginRight  : '-50%',
    transform    : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor(){
    super();

    this.state = {
      player: false,
      power: false,
      strictMode: false,
      startGame: false,
      replay: false,
      step: 0,
      playerStep: 0,
      simonSequence: [],
      animation: false,
      wrongAnimation: false,
      animateTile: 0,
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      player: false,
      startGame: false,
      replay: false,
      step: 0,
      playerStep: 0,
      simonSequence: [],
      animation: false,
      wrongAnimation: false,
      animateTile: 0,
      modalIsOpen: false
    });

    setTimeout(()=>this.handleStartGame(),1000);
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
        replay: false,
        step: 0,
        playerStep: 0,
        simonSequence: [],
        animation: false,
        wrongAnimation: false,
        animateTile: 0
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
        startGame: true,
        wrongAnimation: false
      });
    }
  }

  handleAnimation = (tile) => {
    if(!this.state.power) return;

    this.setState({
      animation: true,
      animateTile: tile
    });

    setTimeout(() => {
      this.setState({
        animation: false
      })
    }, 250);
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
        this.setState({
          player: false,
          animation: true,
          wrongAnimation: true,
          playerStep: 0,
          replay: true
        });
        this.handleAnimation();
        setTimeout(()=>this.replaySequence(),500);
      } else {
        // we are in strict mode, reset the steps, the game resets and starts again
        console.log('STRICT','reset game, start all over');
        this.setState({
          player: false,
          power: true,
          strictMode: true,
          startGame: false,
          replay: false,
          step: 0,
          playerStep: 0,
          simonSequence: [],
          animation: true,
          wrongAnimation: true,
          animateTile: 0
        });

        setTimeout(()=>this.handleStartGame(),2000);
      }
    } else if (tile === currentSequence[currentPlayerStep] && currentPlayerStep < currentSequence.length - 1) {
      console.log('correct step!');
      // we need to promote the step if user click on right tile
      this.setState({
        playerStep: currentPlayerStep + 1,
        wrongAnimation: false
      });

    } else if (tile === currentSequence[currentPlayerStep] && currentPlayerStep === 1) {
      // If you are here you won :)
      // Show a Modal with replay button
      console.log('You Won!');
      this.openModal();
    } else if (tile === currentSequence[currentPlayerStep] && currentPlayerStep === currentSequence.length - 1) {
      console.log('correct! add new random tile :)');
      // if the user accomplished correct sequence replay all the sequence + new step
      this.setState({
        player: false,
        playerStep: 0,
        wrongAnimation: false
      });
      this.replaySequence();
    } 
  }

  playSound = (tileNumber) => {
    this.handleAnimation(tileNumber);
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
    this.setState({
      wrongAnimation: false
    });
    let currentSequence = this.state.simonSequence.slice();
    let timeToTrigger = this.state.step + 1;
    currentSequence.forEach((val, i) => {
      setTimeout(()=>{
        this.playSound(val);
      }, (i + 1)*600);
    });
    
    setTimeout(() => {
      this.randomClick();
    }, timeToTrigger*600);
  }

  randomClick = () => {
    let random = Math.floor(Math.random() * 4) + 1;
    let currentStep = this.state.step;
    let currentSequence = this.state.simonSequence.slice();
    let replayStatus = this.state.replay;

    if(replayStatus){
      this.setState({
        replay: false,
        player: true
      });
      return;
    }

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
      <div className="app-main-container">
        <ModalBox openModal={this.state.modalIsOpen}>
          <div>You Won!</div>
          <a className="button" onClick={this.closeModal}>Start Over</a>
        </ModalBox>
        <Tiles 
          animateTile={this.state.animateTile}
          animate={this.state.animation}
          wrongAnimation={this.state.wrongAnimation}
          handleAnimation={this.handleAnimation}
          handlePlayer={this.handlePlayer}/>
        <Controller 
          power={this.state.power} 
          strict={this.state.strictMode} 
          step={this.state.step}
          handlePower={this.handlePower} 
          handleStrict={this.handleStrict}
          handleStartGame={this.handleStartGame}/>
      </div>
    );
  }
}

export default App;
 