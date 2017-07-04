import React from 'react';
import Switch from './Switch';

class Controller extends React.Component {
  render(){
    return(
      <div className="controller-main-container">
        <Switch onClick={this.props.handlePower} label={'Power'}/>
        <Switch onClick={this.props.handleStrict} label={'Strict'}/>
        <a className="button" onClick={this.props.handleStartGame}>Start</a>
        <div className="step-counter">Step: {this.props.step}</div>
      </div>
    );
  }
}

export default Controller;