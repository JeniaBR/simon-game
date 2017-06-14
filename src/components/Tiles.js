import React from 'react';
let greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

class Tiles extends React.Component {
  render(){
    return(
      <div className="tiles-main-container">
        <div className="green-tile" onClick={()=>greenSound.play()}></div>
        <div className="red-tile" onClick={()=>redSound.play()}></div>
        <div className="yellow-tile" onClick={()=>yellowSound.play()}></div>
        <div className="blue-tile" onClick={()=>blueSound.play()}></div>
      </div>
    );
  }
}

export default Tiles;