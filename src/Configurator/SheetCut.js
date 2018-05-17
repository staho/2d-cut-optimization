import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './SheetCut.css'

class SheetCut extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  calculateWaste = () => {
    let cuts = this.props.data.cuts
    cuts = cuts.filter(cut => {
      return cut.hasOwnProperty('nInSheet') && cut.nInSheet !== "" && cut.nInSheet !== 0
    })
    const sheet = this.props.data.sheet

    let cutsArea = 0
    let sheetArea = sheet.width * sheet.height

    cuts.forEach(cut => {
      if (cut.hasOwnProperty('nInSheet')) {
        cutsArea += (cut.width * cut.height) * cut.nInSheet
      }
    })

    const waste = sheetArea - cutsArea
    console.log(`WASTE: ${waste}`)

    this.props.cutsHandler({ cuts: cuts, waste: waste })
  }

  onCutQuantityInSheetChanged = (cut) => {
    return e => {
      cut.nInSheet = e.target.value
      this.calculateWaste()
    }
  }

  render() {
    const createTable = () => {
      const table = []
      this.props.data.cuts.forEach((cut, i) => {
        table.push(<TableRow key={i}>
          <TableRowColumn>{i}</TableRowColumn>
          <TableRowColumn>
            {cut.width}
          </TableRowColumn>
          <TableRowColumn>
            {cut.height}
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              id='cut-quantity'
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              data-message={i}
              defaultValue={cut.nInSheet ? cut.nInSheet : null}
              onChange={this.onCutQuantityInSheetChanged(cut)}
            />
          </TableRowColumn>

        </TableRow>)
      });

      return table
    }

    return (
      <div className='container'>

        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Szerokość</TableHeaderColumn>
              <TableHeaderColumn>Wysokość</TableHeaderColumn>
              <TableHeaderColumn>Ilość w arkuszu</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {createTable()}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default SheetCut