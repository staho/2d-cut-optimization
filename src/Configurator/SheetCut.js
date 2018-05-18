import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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
import './SheetCut.css'

class SheetCut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cuts: [],
      configs: [],
      wastes: [0],
    }
  }

  componentDidMount() {

    if (this.props.defaultData.configs && this.props.defaultData.wastes) {
      this.setState({
        configs: this.props.defaultData.configs,
        wastes: this.props.defaultData.wastes
      }, () => {
        this.state.configs.forEach((config, index) => {
          if (index !== this.state.configs.length - 1) {
            this.calculateWaste(index)
          }
        })
      })
    } else {
      if (this.props.data.cuts.length > 0) {
        const configs = this.props.data.cuts.map((cut, index) => {
          return {
            cut: cut,
          }
        })
        this.setState({
          configs: [
            ...this.state.configs,
            configs
          ]
        }, () => {
          // console.log(this.state.configs)
        })
      }
    }

    if (this.props.data.cuts.length > 0) { this.setState({ cuts: this.props.data.cuts }) }
    if (this.props.data.sheet) { this.setState({ sheet: this.props.data.sheet }) }
  }


  isEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }


  isRowEmpty = arr => {

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].hasOwnProperty('nInSheet')) { return false }
    }

    return true
  }

  getPayload = () => {
    return { configs: this.state.configs, wastes: this.state.wastes }
  }


  deleteConfigElemProperty = (index, i, propName) => {

    const configs = this.state.configs.slice()
    const config = configs[index].slice()
    const elem = Object.assign({}, config[i])
    delete elem[propName]
    config[i] = elem;
    configs[index] = config


    this.setState({ configs: configs }, () => {
      this.calculateWaste(index)
      this.props.sheetCutsHandler(this.getPayload())
    });
  }


  updateConfigElem = (index, i, propName, value) => {

    const configs = this.state.configs.slice()
    const config = configs[index].slice()
    const elem = Object.assign({}, config[i],
      { [propName]: value }
    );
    config[i] = elem
    configs[index] = config


    this.setState({ configs: configs }, () => {
      this.calculateWaste(index)
      this.props.sheetCutsHandler(this.getPayload())
    })
  }


  pushEmptyConfig = () => {

    const initialArr = this.state.cuts.map(cut => {
      return {
        cut: cut,
      }
    })


    this.setState(prevState => {
      return {
        configs: [...prevState.configs, initialArr]
      }
    }, () => {
      this.props.sheetCutsHandler(this.getPayload())
    })

    this.setState(prevState => {
      return { wastes: [...prevState.wastes, null] }
    })
  }


  removeConfig = index => {

    this.setState(prevState => ({
      configs: update(prevState.configs, { $splice: [[index, 1]] })
    }), () => {
      this.props.sheetCutsHandler(this.getPayload())
      this.forceUpdate()
    })

    this.setState(prevState => ({
      wastes: update(prevState.wastes, { $splice: [[index, 1]] })
    }))
  }


  calculateWaste = index => {

    const sheet = this.state.sheet
    const config = this.state.configs[index]


    let cutsArea = 0
    let sheetArea = sheet.width * sheet.height


    config.forEach(obj => {
      if (obj.hasOwnProperty('nInSheet')) {
        cutsArea += (obj.cut.width * obj.cut.height) * obj.nInSheet
      }
    })

    const waste = (sheetArea - cutsArea) * sheet.wasteCost

    const wastes = this.state.wastes.slice()
    wastes[index] = waste
    this.setState({ wastes: wastes }, () => {
      // console.log(this.state.wastes)
    })

  }


  onCutnInSheetChanged = (e, index, i) => {

    const value = e.target.value


    if (value === "") {
      this.deleteConfigElemProperty(index, i, 'nInSheet')
    } else {
      this.updateConfigElem(index, i, 'nInSheet', value)
    }

    if (index === this.state.configs.length - 1) {
      this.pushEmptyConfig()
    }
  }


  onTextFieldBlur = (e, index) => {

    if (this.isRowEmpty(this.state.configs[index])) {
      this.removeConfig(index)
    }
  }



  render() {

    const createHeaders = () => {
      return this.state.cuts.map((cut, index) => {
        return <TableHeaderColumn key={index}>
          {`${cut.width}x${cut.height}`}
        </TableHeaderColumn>
      })

    }

    const createTable = () => {

      const table = []
      for (let i = 0; i < this.state.configs.length; i++) {
        let row = [
          <TableRowColumn key={`id-${i}`}>{i}</TableRowColumn>
        ]

        const cutsTextFields = this.state.configs[i].map((obj, index) => {
          return (
            <TableRowColumn key={index}>
              <TextField
                id={`cut-n-${index}`}
                style={{ width: '60px' }}
                inputStyle={{ textAlign: 'center' }}
                onBlur={event => this.onTextFieldBlur(event, i)}
                onChange={event => this.onCutnInSheetChanged(event, i, index)}
                value={this.state.configs[i][index].nInSheet ?
                  this.state.configs[i][index].nInSheet : ""}
              />
            </TableRowColumn>
          )
        })

        row.push(...cutsTextFields)
        row.push(<TableRowColumn key={`waste-${i}`}>
          {this.state.wastes[i] ?
            `${this.state.wastes[i]} zł` :
            ""
          }
        </TableRowColumn>)
        table.push(row)
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
              {createHeaders()}
              <TableHeaderColumn>Odpad</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>

            {createTable().map((row, index) => {
              return <TableRow key={index}>
                {row}
              </TableRow>
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default SheetCut