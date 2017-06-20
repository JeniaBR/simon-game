import React from 'react';


class Tiles extends React.Component {
  render(){
    console.log(this.props.animate);
    return(
      <div className="tiles-main-container">
        <div className={`green-tile ${this.props.animate && this.props.animateTile === 1 ? 'animation' : ''}`} onClick={()=>{this.props.handlePlayer(1);this.props.handleAnimation(1)}}></div>
        <div className={`red-tile ${this.props.animate && this.props.animateTile === 2 ? 'animation' : ''}`} onClick={()=>{this.props.handlePlayer(2);this.props.handleAnimation(2)}}></div>
        <div className={`yellow-tile ${this.props.animate && this.props.animateTile === 3 ? 'animation' : ''}`} onClick={()=>{this.props.handlePlayer(3);this.props.handleAnimation(3)}}></div>
        <div className={`blue-tile ${this.props.animate && this.props.animateTile === 4 ? 'animation' : ''}`} onClick={()=>{this.props.handlePlayer(4);this.props.handleAnimation(4)}}></div>
      </div>
    );
  }
}

export default Tiles;