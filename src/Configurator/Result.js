import React, { Component } from 'react'
import './Result.css'

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='container'>

        {this.props.result ?
          <h3>
            {JSON.stringify(this.props.result)}
          </h3> :
          <div>
            <h3 className='invalid-input-header'>
              Nieprawidłowe dane
          </h3>
            <p className='invalid-input-text'>
              Popraw dane z poprzednich kroków i spróbuj ponownie.
          </p>
          </div>


        }


      </div>
    )
  }
}

export default Result