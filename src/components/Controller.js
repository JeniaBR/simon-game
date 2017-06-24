import React from 'react';

class Controller extends React.Component {
  render(){
    return(
      <div className="controller-main-container">
        <a className="button" href="#" onClick={this.props.handlePower}>Power: {this.props.power ? 'On' : 'Off'}</a>
        <a className="button" onClick={this.props.handleStrict}>Strict: {this.props.strict ? 'On' : 'Off'}</a>
        <a className="button" onClick={this.props.handleStartGame}>Start Game</a>
        <div>Step: {this.props.step}</div>
      </div>
    );
  }
}

export default Controller;