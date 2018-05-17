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
    this.state = {
      configs: []
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if(prevState.configs.length === 0) {
      let newConfigs = []
      let conf1 = {}
      nextProps.data.cuts.forEach((cut, i) => {
        conf1[`cut${i}`] = ""
      })
      conf1["waste"] = ""
      newConfigs.push(conf1)
      return {
        configs: newConfigs
      }
    }
    return null
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

  //Todo: changing state of cuts and adding new config
  onCutQuantityChange = (event, i, j, waste) => {
    let tempConfigs = [...this.state.configs]
    if(waste) {
      tempConfigs[i]['waste'] = event.target.value

    } else {
      tempConfigs[i][`cut${j}`] = event.target.value
    }
    this.setState({configs: tempConfigs})
  }

  newRow = (i, j, waste) => {
    return (
        <TableRowColumn key={`row-column-cut-${i}-${j}`}>
          <TextField
                id={`cut-quantity-${i}-${j}`}
                style={{ width: '60px' }}
                inputStyle={{ textAlign: 'center' }}
                value={waste ? this.state.configs[i][`waste`] : this.state.configs[i][`cut${j}`]}
                onChange={(value) => this.onCutQuantityChange(value, i, j, waste)}
              />
        </TableRowColumn>
      )
  }

  render() {
   
    const createHeaders = () => {
      return this.props.data.cuts.map((cut, i) => {
        return <TableHeaderColumn key={`header-cut-${i}`}>{`Ilość cięcia ${i}`}</TableHeaderColumn>
      })
    }

    const createTableNew = () => {

      return this.state.configs.map((config, i) => {
        let rowColumns = [], j =0
        rowColumns.push(<TableRowColumn key={`row-column-cut-id${i}`}>{i}</TableRowColumn>)

        for (let property in config) {
          if (config.hasOwnProperty(property)) {
              rowColumns.push(this.newRow(i,j, property === 'waste'))
          }
          j++
      }
      return (<TableRow key={i}>{rowColumns}</TableRow>)
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
                {createHeaders()}
              <TableHeaderColumn>Odpad</TableHeaderColumn>
              
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {createTableNew()}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default SheetCut