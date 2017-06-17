import React from 'react';


class Tiles extends React.Component {
  render(){
    return(
      <div className="tiles-main-container">
        <div className="green-tile" onClick={()=>this.props.handlePlayer(1)}></div>
        <div className="red-tile" onClick={()=>this.props.handlePlayer(2)}></div>
        <div className="yellow-tile" onClick={()=>this.props.handlePlayer(3)}></div>
        <div className="blue-tile" onClick={()=>this.props.handlePlayer(4)}></div>
      </div>
    );
  }
}

export default Tiles;