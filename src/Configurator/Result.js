import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './Result.css'

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let resultDiv = null
    if (this.props.result && this.props.result.feasible) {
      resultDiv = <Table selectable={false} fixedHeader={false} showRowHover={true}>
        <TableBody displayRowCheckbox={false}>
          {Object.keys(this.props.result).map((key, index) => {
            if (key !== 'feasible' && key !== 'bounded') {
              return <TableRow key={index}>
                <TableHeaderColumn>{key === 'result' ? 'Całkowity odpad' :
                  `Konfiguracja ${key.charAt(1)}.`}</TableHeaderColumn>
                <TableRowColumn>{key === 'result' ? `${this.props.result[key]} zł` : `x ${this.props.result[key]}`}</TableRowColumn>
              </TableRow>
            } else {
              return null
            }
          })}
        </TableBody>
      </Table>
    } else if (this.props.result && !this.props.result.feasible) {
      resultDiv = <div>
        <h3 className='invalid-input-header'>
          Układ nierozwiązywalny
      </h3>
        <p className='invalid-input-text'>
          Układ równań jest niemożliwy do rozwiązania.
        </p>
      </div>
    } else {
      resultDiv = <div>
        <h3 className='invalid-input-header'>
          Nieprawidłowe dane
          </h3>
        <p className='invalid-input-text'>
          Popraw dane z poprzednich kroków i spróbuj ponownie.
          </p>
      </div>
    }

    return (
      <div className='container-small'>
        {resultDiv}
      </div>
    )
  }
}

export default Result