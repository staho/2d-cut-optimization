import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import update from 'react-addons-update'
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
      cuts: [{}],
    }
  }

  componentDidMount() {

    if (this.props.defaultData.length > 0) {
      this.setState({ cuts: this.props.defaultData })
    }
  }


  isEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }


  deleteCutProperty = (index, propName) => {

    const cuts = this.state.cuts.slice()
    const cut = Object.assign({}, this.state.cuts[index])
    delete cut[propName]
    cuts[index] = cut;


    this.setState({ cuts: cuts }, () => {
      this.props.cutsHandler(this.state.cuts)
    });
  }


  pushEmptyCut = () => {

    this.setState(prevState => {
      return {
        cuts: [...prevState.cuts, {}]
      }
    }, () => {
      this.props.cutsHandler(this.state.cuts)
    })
  }


  updateCut = (index, propName, value) => {

    const cuts = this.state.cuts.slice()
    const cut = Object.assign({}, this.state.cuts[index],
      { [propName]: value }
    );
    cuts[index] = cut;


    this.setState({ cuts: cuts }, () => {
      this.props.cutsHandler(this.state.cuts)
    })
  }


  removeCut = index => {

    this.setState(prevState => ({
      cuts: update(prevState.cuts, { $splice: [[index, 1]] })
    }), () => {
      this.props.cutsHandler(this.state.cuts)
      this.forceUpdate()
    })
  }


  onCutWidthChanged = (e, index) => {

    const value = e.target.value

    if (value === "") {
      this.deleteCutProperty(index, 'width')
    } else {
      this.updateCut(index, 'width', value)
    }

    if (index === this.state.cuts.length - 1) {
      this.pushEmptyCut()
    }
  }


  onCutHeightChanged = (e, index) => {

    const value = e.target.value

    if (value === "") {
      this.deleteCutProperty(index, 'height')
    } else {
      this.updateCut(index, 'height', value)
    }

    if (index === this.state.cuts.length - 1) {
      this.pushEmptyCut()
    }
  }


  onCutQuantityChanged = (e, index) => {

    const value = e.target.value

    if (value === "") {
      this.deleteCutProperty(index, 'nOrdered')
    } else {
      this.updateCut(index, 'nOrdered', value)
    }

    if (index === this.state.cuts.length - 1) {
      this.pushEmptyCut()
    }
  }


  onTextFieldBlur = (e, index) => {

    if (this.isEmpty(this.state.cuts[index])) {
      this.removeCut(index)
    }
  }



  render() {
    const createTable = () => {

      return this.state.cuts.map((cut, index) => {
        return (<TableRow key={index}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>
            <TextField
              id='cut-width'
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              onBlur={event => this.onTextFieldBlur(event, index)}
              onChange={event => this.onCutWidthChanged(event, index)}
              value={this.state.cuts[index].width ? this.state.cuts[index].width : ""}
            />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              id='cut-height'
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              onBlur={event => this.onTextFieldBlur(event, index)}
              onChange={event => this.onCutHeightChanged(event, index)}
              value={this.state.cuts[index].height ? this.state.cuts[index].height : ""}
            />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              id='cut-quantity'
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              onBlur={event => this.onTextFieldBlur(event, index)}
              onChange={event => this.onCutQuantityChanged(event, index)}
              value={this.state.cuts[index].nOrdered ? this.state.cuts[index].nOrdered : ""}
            />
          </TableRowColumn>
        </TableRow>)
      })
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