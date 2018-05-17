import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Solver from './Solver/Solver'
import Configurator from './Configurator/Configurator'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      model: undefined
    }
  }


  onSubmit = (result) => {
   this.setState({model: result})
    console.log(result)
  }

  render() {
    return (
      <div className="App">
        <Solver model={this.state.result}/>
        <MuiThemeProvider>
          <div>
            <Configurator onSubmit={this.onSubmit}></Configurator>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
