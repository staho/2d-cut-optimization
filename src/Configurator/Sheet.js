import React, { Component } from 'react';
import './Sheet.css'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Sheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {
        'sheet-height': null,
        'sheet-width': null,
        'waste-cost': null,
      },
    }
  }

  onSheetWidthChanged = e => {

    const value = e.target.value

    this.validate(value, 'sheet-width', () => {
      this.props.sheetHandler({ width: value })
    })
  }

  onSheetHeightChanged = e => {

    const value = e.target.value

    this.validate(value, 'sheet-height', () => {
      this.props.sheetHandler({ height: value })
    })
  }

  onSheetWasteCostChanged = e => {

    const value = e.target.value

    this.validate(value, 'waste-cost', () => {
      this.props.sheetHandler({ wasteCost: value })
    })
  }


  validate = (value, inputKey, callback) => {

    this.setState({
      errors: {
        ...this.state.errors,
        [inputKey]: isNaN(Number(value)) ? 'Podaj liczbę.' : null
      }
    }, () => callback())
  }


  render() {
    return (
      <div className='container'>
        <DropDownMenu value={1} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Arkusz 1" />
        </DropDownMenu>
        <div className='sheet-container-upper'>
          <div className='sheet'>

            {
              this.props.defaultData.width || this.props.defaultData.height ?
                `${this.props.defaultData.width} x ${this.props.defaultData.height}` :
                'Podaj wymiary'
            }
          </div>
          <TextField
            key='sheet-height'
            className='sheet-input-right'
            style={{ width: '60px' }}
            inputStyle={{ textAlign: 'center' }}
            floatingLabelText="Wysokość"
            defaultValue={this.props.defaultData.height}
            onChange={this.onSheetHeightChanged}
            errorText={this.state.errors['sheet-height']}
          />
        </div>
        <TextField
          key='sheet-width'
          className='sheet-input-bottom'
          style={{ width: '60px' }}
          inputStyle={{ textAlign: 'center' }}
          floatingLabelText="Szerokość"
          defaultValue={this.props.defaultData.width}
          onChange={this.onSheetWidthChanged}
          errorText={this.state.errors['sheet-width']}
        />

        <Divider style={{ marginTop: '25px' }}></Divider>

        <div className='sheet-info'>
          <TextField
            key='waste-cost'
            inputStyle={{ textAlign: 'center' }}
            floatingLabelText="Cena za 1 m² odpadów"
            defaultValue={this.props.defaultData.wasteCost}
            onChange={this.onSheetWasteCostChanged}
            errorText={this.state.errors['waste-cost']}
          />
        </div>
      </div>
    )
  }
}

export default Sheet