import React, { Component } from 'react';
import Sheet from './Sheet'
import Cuts from './Cuts'
import SheetCut from './SheetCut'
import Result from './Result'
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.result !== undefined) {
      return {
        stepIndex: 3
      }
    } else {
      return null
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
      newConfigs[i] = newConfigs[i].filter(obj => value.some(cut => cut._id === obj.cut._id))
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
    this.setState({
      wastes: this.calculateWastes()
    }, () => {
      const result = {
        sheet: this.state.sheet,
        cuts: this.state.cuts.slice(0, this.state.cuts.length - 1),
        configs: this.state.configs.slice(0, this.state.configs.length - 1),
        wastes: this.state.wastes.slice(0, this.state.wastes.length - 1),
      }

      console.log(result)

      this.props.onSubmit(this.validateResult(result) ? result : null)
    })
  }


  validateResult = (result, callback) => {
    let ok = true

    const sheet = Object.assign({}, result.sheet)
    if (sheet.width === null ||
      sheet.width === "" ||
      isNaN(Number(sheet.width))) {

      ok = false
      sheet.width = undefined
    }
    if (sheet.height === null ||
      sheet.height === "" ||
      isNaN(Number(sheet.height))) {

      ok = false
      sheet.height = undefined
    }
    if (sheet.wasteCost === null ||
      sheet.wasteCost === "" ||
      isNaN(Number(sheet.wasteCost))) {

      ok = false
      sheet.wasteCost = undefined
    }

    result.cuts.forEach(cut => {
      if (cut.height === null ||
        cut.height === "" ||
        isNaN(Number(cut.height))) { ok = false }
      if (cut.width === null ||
        cut.width === "" ||
        isNaN(Number(cut.width))) { ok = false }
      if (cut.nOrdered === null ||
        cut.nOrdered === "" ||
        isNaN(Number(cut.nOrdered))) { ok = false }
    })


    result.configs.forEach(config => {
      config.forEach(obj => {
        if (obj.nInSheet === null ||
          obj.nInSheet === "" ||
          isNaN(Number(obj.nInSheet))) { ok = false }
      })
    })


    result.wastes.forEach(waste => {
      if (waste === null ||
        waste < 0 ||
        isNaN(waste)) { ok = false }
    })

    this.setState({ sheet: sheet })

    return ok
  }


  render() {
    const { stepIndex, doneSteps } = this.state;

    let stepView = <div></div>

    switch (stepIndex) {
      case 0:
        stepView =
          <Sheet sheetHandler={this.sheetHandler} defaultData={this.state.sheet}></Sheet>

        break
      case 1:
        stepView =
          <Cuts cutsHandler={this.cutsHandler} defaultData={this.state.cuts}></Cuts>

        break
      case 2:
        stepView =
          <SheetCut sheetCutsHandler={this.sheetCutsHandler} data={this.getSheetCutData()}
            defaultData={{ configs: this.state.configs, wastes: this.state.wastes }}></SheetCut>

        break
      case 3:
        stepView =
          <Result result={this.props.result}></Result>

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
              Dodaj rozkroje
            </StepButton>
          </Step>
          <Step completed={doneSteps.indexOf(2) !== -1} active={stepIndex === 2}>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              Dodaj konfiguracje rozkrojów
            </StepButton>
          </Step>
          <Step completed={doneSteps.indexOf(3) !== -1} active={stepIndex === 3}
            disabled={this.props.result === undefined ? true : false}>
            <StepButton onClick={() => this.setState({ stepIndex: 3 })}>
              Wynik
            </StepButton>
          </Step>
        </Stepper>

        {stepView}

        <RaisedButton
          label='Submit'
          className='submit-button-root'
          buttonStyle={{
            width: '100px',
          }}
          primary={true}
          style={{ color: 'white', marginLeft: '-50px', boxShadow: '0px 5px 25px #aaa' }}
          onClick={this.onSubmit}
        />

      </div>
    )
  }
}

export default Configurator