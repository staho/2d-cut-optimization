import React, { Component } from 'react';
import './Sheet.css'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'

class Sheet extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onSheetWidthChanged = e => {
    const value = e.target.value
    this.props.sheetHandler({ width: value })
  }

  onSheetHeightChanged = e => {
    const value = e.target.value

    this.props.sheetHandler({ height: value })
  }

  onSheetWasteCostChanged = e => {
    const value = e.target.value

    this.props.sheetHandler({ wasteCost: value })
  }

  onSheetQuantityChanged = e => {
    const value = e.target.value

    this.props.sheetHandler({ quantity: value })
  }

  render() {
    return (
      <div className='container'>
        <h3>Podaj wymiary arkusza:</h3>
        <div className='sheet-container-upper'>
          <div className='sheet'>Arkusz</div>
          <TextField
            id='sheet-height'
            className='sheet-input-right'
            style={{ width: '60px' }}
            inputStyle={{ textAlign: 'center' }}
            floatingLabelText="Wysokość"
            defaultValue={this.props.defaultData.height}
            onChange={this.onSheetHeightChanged}
          />
        </div>
        <TextField
          id='sheet-width'
          className='sheet-input-bottom'
          style={{ width: '60px' }}
          inputStyle={{ textAlign: 'center' }}
          floatingLabelText="Szerokość"
          defaultValue={this.props.defaultData.width}
          onChange={this.onSheetWidthChanged}
        />

        <Divider style={{ marginTop: '25px' }}></Divider>

        <div className='sheet-info'>
          <TextField
            id='waste-cost'
            inputStyle={{ textAlign: 'center' }}
            floatingLabelText="Cena za 1 m² odpadów"
            defaultValue={this.props.defaultData.wasteCost}
            onChange={this.onSheetWasteCostChanged}
          />
        </div>
      </div>
    )
  }
}

export default Sheet