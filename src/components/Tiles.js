import React from 'react';


class Tiles extends React.Component {
  render(){
    return(
      <div className="tiles-main-container">
        <div className="green-tile"></div>
        <div className="red-tile"></div>
        <div className="yellow-tile"></div>
        <div className="blue-tile"></div>
      </div>
    );
  }
}

export default Tiles;