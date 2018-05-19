import React, { Component } from 'react';
import Sheet from './Sheet'
import Cuts from './Cuts'
import SheetCut from './SheetCut'
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './Configurator.css'

class Configurator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
      doneSteps: [],
      sheet: {
        width: null,
        height: null,
        wasteCost: null,
      },
      cuts: [],
      configs: [],
      wastes: null,
    }
  }

  isNotEmpty = obj => {
    return !(Object.keys(obj).length === 1 && obj.constructor === Object)
  }

  sheetHandler = value => {
    this.setState(prevState => ({
      sheet: {
        ...prevState.sheet,
        ...value
      }
    }), () => {
      // console.log(this.state.sheet)
    })
  }

  cutsHandler = value => {
    this.setState({ cuts: value }, () => {
      // console.log(this.state.cuts)
    })

    const newConfigs = this.state.configs.slice()

    for (let i = 0; i < newConfigs.length; i++) {
      newConfigs[i] = newConfigs[i].filter(obj => value.includes(obj.cut))
    }

    if (newConfigs !== this.state.configs) {
      this.setState({ configs: newConfigs })
    }
  }

  sheetCutsHandler = value => {
    this.setState({ configs: value.configs, wastes: value.wastes }, () => {
      // console.log(this.state.configs)
    })
  }



  getSheetCutData = () => {
    return {
      sheet: this.state.sheet,
      cuts: this.state.cuts.filter(this.isNotEmpty)
    }
  }


  calculateWastes = () => {
    const sheet = this.state.sheet
    let sheetArea = sheet.width * sheet.height
    const wastes = []

    this.state.configs.forEach(config => {
      let cutsArea = 0
      config.forEach(obj => {
        if (obj.hasOwnProperty('nInSheet')) {
          cutsArea += (obj.cut.width * obj.cut.height) * obj.nInSheet
        }
      })

      wastes.push((sheetArea - cutsArea) * sheet.wasteCost)
    })

    return wastes
  }

  onSubmit = e => {
    this.setState({ wastes: this.calculateWastes() }, () => {
      const result = {
        sheet: this.state.sheet,
        cuts: this.state.cuts.slice(0, this.state.cuts.length - 1),
        configs: this.state.configs.slice(0, this.state.configs.length - 1),
        wastes: this.state.wastes.slice(0, this.state.wastes.length - 1),
      }

      this.props.onSubmit(result)
    })
  }


  render() {
    const { stepIndex, doneSteps } = this.state;

    let stepView = <div></div>

    switch (stepIndex) {
      case 0:
        stepView = <div>
          <Sheet sheetHandler={this.sheetHandler} defaultData={this.state.sheet}></Sheet>
        </div>
        break
      case 1:
        stepView = <div>
          <Cuts cutsHandler={this.cutsHandler} defaultData={this.state.cuts}></Cuts>
        </div>
        break
      case 2:
        stepView = <div>
          <SheetCut sheetCutsHandler={this.sheetCutsHandler} data={this.getSheetCutData()}
            defaultData={{ configs: this.state.configs, wastes: this.state.wastes }}></SheetCut>
        </div>
        break
      default:
        break
    }

    return (
      <div>
        <Stepper linear={false}>
          <Step completed={doneSteps.indexOf(0) !== -1} active={stepIndex === 0}>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
              Podaj informacje na temat arkusza
            </StepButton>
          </Step>
          <Step completed={doneSteps.indexOf(1) !== -1} active={stepIndex === 1}>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              Stwórz rozkroje
            </StepButton>
          </Step>
          <Step completed={doneSteps.indexOf(2) !== -1} active={stepIndex === 2}>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              Wybierz konfiguracje rozkroju
            </StepButton>
          </Step>
        </Stepper>

        {stepView}

        <RaisedButton
          label='Submit'
          className='submit-button'
          primary={true}
          style={{ color: 'white' }}
          onClick={this.onSubmit}
        />

      </div>
    )
  }
}

export default Configurator