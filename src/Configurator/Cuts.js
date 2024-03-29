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
import uniqid from 'uniqid'

class Cuts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cuts: [{ _id: uniqid() }],
      errors: [{ id: 0, 'cut-width': null, 'cut-height': null, 'cut-nOrdered': null }]
    }

  }

  componentDidMount() {

    if (this.props.defaultData.length > 0) {
      this.setState({ cuts: this.props.defaultData }, () => {
        const errors = this.state.errors.slice()
        this.state.cuts.forEach((cut, index) => {
          if (index !== this.state.cuts.length - 1) {
            errors[index] = {
              id: index,
              'cut-width': this.getValidation(cut.width),
              'cut-height': this.getValidation(cut.height),
              'cut-nOrdered': this.getValidation(cut.nOrdered)
            }
          } else {
            errors[index] = {
              id: index,
              'cut-width': null,
              'cut-height': null,
              'cut-nOrdered': null
            }
          }
        })
        this.setState({ errors: errors })
      })
    }
  }


  isEmpty = obj => {
    return Object.keys(obj).length === 1 && obj.constructor === Object
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
        cuts: [...prevState.cuts, { _id: uniqid() }],
        errors: [...prevState.errors, {
          id: prevState.errors.length,
          'cut-width': null,
          'cut-height': null,
          'cut-nOrdered': null
        }]
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

    if (this.state.cuts.length !== 1 && index !== this.state.cuts.length - 1) {
      this.setState(prevState => ({
        cuts: update(prevState.cuts, { $splice: [[index, 1]] }),
        errors: update(prevState.errors, { $splice: [[index, 1]] }),

      }), () => {
        this.props.cutsHandler(this.state.cuts)
        this.forceUpdate()
      })
    }
  }


  onCutWidthChanged = (e, index) => {

    const value = e.target.value

    this.validate(value, index, 'cut-width', (result, err) => {
      if (err) { console.error(err) }

      if (value === "") {
        this.deleteCutProperty(index, 'width')
      } else {
        this.updateCut(index, 'width', value)
      }

      if (index === this.state.cuts.length - 1) {
        this.pushEmptyCut()
      }
    })
  }


  onCutHeightChanged = (e, index) => {

    const value = e.target.value

    this.validate(value, index, 'cut-height', (result, err) => {
      if (err) { console.error(err) }

      if (value === "") {
        this.deleteCutProperty(index, 'height')
      } else {
        this.updateCut(index, 'height', value)
      }

      if (index === this.state.cuts.length - 1) {
        this.pushEmptyCut()
      }
    })
  }


  onCutQuantityChanged = (e, index) => {

    const value = e.target.value

    this.validate(value, index, 'cut-nOrdered', (result, err) => {
      if (err) { console.error(err) }

      if (value === "") {
        this.deleteCutProperty(index, 'nOrdered')
      } else {
        this.updateCut(index, 'nOrdered', value)
      }

      if (index === this.state.cuts.length - 1) {
        this.pushEmptyCut()
      }
    })
  }


  onTextFieldBlur = (e, index) => {
    if (this.isEmpty(this.state.cuts[index])) {
      this.removeCut(index)
    }
  }

  validate = (value, index, inputKey, callback = null) => {
    const errors = this.state.errors.slice()

    const err = isNaN(Number(value)) ? 'Podaj liczbę' : null
    let errMsg = null
    if (err) {
      errMsg = `TYPE_ERROR: in ${inputKey}`
    }

    errors[index][inputKey] = err

    this.setState({
      errors: errors
    }, () => callback(null, errMsg))
  }

  getValidation = (value) => {
    return isNaN(Number(value)) ? 'Podaj liczbę' : null
  }



  render() {
    const createTable = () => {

      return this.state.cuts.map((cut, index) => {
        return (<TableRow key={index}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>
            <TextField
              id={`cut-width-${index}`}
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              onBlur={event => this.onTextFieldBlur(event, index)}
              onChange={event => this.onCutWidthChanged(event, index)}
              value={this.state.cuts[index].width ? this.state.cuts[index].width : ""}
              errorText={this.state.errors[index] && this.state.errors[index]['cut-width']}
            />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              id={`cut-height-${index}`}
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              onBlur={event => this.onTextFieldBlur(event, index)}
              onChange={event => this.onCutHeightChanged(event, index)}
              value={this.state.cuts[index].height ? this.state.cuts[index].height : ""}
              errorText={this.state.errors[index] && this.state.errors[index]['cut-height']}
            />
          </TableRowColumn>
          <TableRowColumn>
            <TextField
              id={`cut-nOrdered-${index}`}
              style={{ width: '60px' }}
              inputStyle={{ textAlign: 'center' }}
              onBlur={event => this.onTextFieldBlur(event, index)}
              onChange={event => this.onCutQuantityChanged(event, index)}
              value={this.state.cuts[index].nOrdered ? this.state.cuts[index].nOrdered : ""}
              errorText={this.state.errors[index] && this.state.errors[index]['cut-nOrdered']}
            />
          </TableRowColumn>
        </TableRow>)
      })
    }


    return (
      <div className='container'>
        <Table selectable={false} fixedHeader={false}>
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
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {createTable()}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Cuts