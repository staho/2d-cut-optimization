import React, { Component } from 'react'
import './Result.css'

class Result extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='container'>
        {this.props.result}
      </div>
    )
  }
}

export default Result