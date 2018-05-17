import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './Cuts.css'

class Cuts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nCuts: 0,
    }
    this.cuts = []
  }

  componentDidMount() {
    if (this.props.defaultData.length > 0) {
      this.cuts = this.props.defaultData
      this.setState({ nCuts: this.props.defaultData.length })
    }
  }

  isEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  adjustNumberOfRows = (cut) => {
    const index = this.cuts.indexOf(cut)

    if (this.state.nCuts !== this.cuts.length) {
      this.setState({ nCuts: this.cuts.length })
    }
  }

  onCutWidthChanged = e => {
    const value = e.target.value
    const index = Number(e.target.dataset.message)

    if (this.cuts[index] !== undefined) {
      if (value === "") {
        delete this.cuts[index].width
        if (index === this.cuts.length - 1 && index !== 0 && this.isEmpty(this.cuts[index])) {
          this.cuts.splice(index, 1)
        }
      } else {
        this.cuts[index].width = value
      }
    } else {
      this.cuts.push({ width: value })
    }

    this.props.cutsHandler(this.cuts)
    this.adjustNumberOfRows(this.cuts[index])
  }

  onCutHeightChanged = e => {
    const value = e.target.value
    const index = Number(e.target.dataset.message)

    if (this.cuts[index] !== undefined) {
      if (value === "") {
        delete this.cuts[index].height
        console.log(typeof (index), typeof (this.cuts.length - 1))

        if (index === this.cuts.length - 1 && index !== 0 && this.isEmpty(this.cuts[index])) {
          this.cuts.slice(index, 1)
        }
      } else {
        this.cuts[index].height = value
      }
    } else {
      this.cuts.push({ height: value })
    }

    this.props.cutsHandler(this.cuts)
    this.adjustNumberOfRows(this.cuts[index])
  }

  onCutQuantityChanged = e => {
    const value = e.target.value
    const index = Number(e.target.dataset.message)

    if (this.cuts[index] !== undefined) {
      if (value === "") {
        delete this.cuts[index].nOrdered
        console.log(index, this.cuts.length - 1)
        if (index === this.cuts.length - 1 && index !== 0 && this.isEmpty(this.cuts[index])) {
          this.cuts.slice(index, 1)
        }
      } else {
        this.cuts[index].nOrdered = value
      }
    } else {
      this.cuts.push({ nOrdered: value })
    }

    this.props.cutsHandler(this.cuts)
    this.adjustNumberOfRows(this.cuts[index])
  }


  render() {
    const createTable = () => {
      const table = []
      for (let i = 0; i < this.state.nCuts + 1; i++) {
        table.push(<TableRow key={i}>
          <TableRowColumn>{i}</TableRowColumn>
          <TableRowColumn>
            <TextField
              id='cut-width'
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              data-message={i}
              defaultValue={this.props.defaultData[i] ? this.props.defaultData[i].width : null}
              onChange={this.onCutWidthChanged}
            />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              id='cut-height'
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              data-message={i}
              defaultValue={this.props.defaultData[i] ? this.props.defaultData[i].height : null}
              onChange={this.onCutHeightChanged}
            />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              id='cut-quantity'
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              data-message={i}
              defaultValue={this.props.defaultData[i] ? this.props.defaultData[i].nOrdered : null}
              onChange={this.onCutQuantityChanged}
            />
          </TableRowColumn>
        </TableRow>)
      }

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
              <TableHeaderColumn>Zamówiona ilość</TableHeaderColumn>
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

export default Cuts