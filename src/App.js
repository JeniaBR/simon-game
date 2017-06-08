import React, { Component } from 'react';
import Tiles from './components/Tiles';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Simon Game :)</h1>
        <Tiles/>
      </div>
    );
  }
}

export default App;
 