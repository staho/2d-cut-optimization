import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Solver from './Solver/Solver'

class App extends Component {


  render() {
    return (
      <div className="App">
        <Solver />
      </div>
    );
  }
}

export default App;
