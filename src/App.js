import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Solver from './Solver/Solver'
import Configurator from './Configurator/Configurator'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: undefined,
      result: undefined
    }
  }


  onSubmit = (input) => {
    this.setState({ input: input })
  }

  setResult = output => {
    this.setState({ result: output })
  }

  render() {
    return (
      <div className="App">
        <Solver input={this.state.input} setResult={this.setResult} />
        <MuiThemeProvider>
          <div>
            <Configurator onSubmit={this.onSubmit} result={this.state.result}></Configurator>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
