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
          <h3 className='invalid-input-label'>
            Invalid input
          </h3>

        }


      </div>
    )
  }
}

export default Result