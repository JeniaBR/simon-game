import React from 'react';

class Controller extends React.Component {
  render(){
    return(
      <div>
        <button onClick={this.props.handlePower}>Power: {this.props.power ? 'on' : 'off'}</button>
        <button onClick={this.props.handleStrict}>Strict: {this.props.strict ? 'on' : 'off'}</button>
        <button onClick={this.props.handleStartGame}>Start Game</button>
        <div>Step: {this.props.step}</div>
      </div>
    );
  }
}

export default Controller;