import React from 'react'
import solver from 'javascript-lp-solver'

const exampleModel = {
  optimize: "waste",
  opType: "min",
  constraints: {
    cutA: { "min": 10 },    //10 is minimum amount of A cut
    cutB: { "min": 30 }     // --||--
  },
  variables: {
    x1: { cutA: 5, cutB: 0, waste: 0.2 },   //how many cuts we are able to do on
    x2: { cutA: 4, cutB: 0, waste: 1 },     //one plate and how much waste we it causes
    x3: { cutA: 3, cutB: 1, waste: 0.5 },
    x4: { cutA: 2, cutB: 2, waste: 0.1 }
  }
}


const createModel = input => {
  if (!input) { return null }
  else {

    //TODO: Create proper model for solver

    return {
      optimize: "waste",
      opType: "min",
      constraints: {},
      variables: {}
    }

  }
}


class Solver extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      input: undefined,
      model: exampleModel,
      output: undefined
    }
  }

  componentDidMount = () => {
    let result = solver.Solve(this.state.model)
    console.log(result)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.input !== undefined && nextProps.input !== prevState.input) {
      const model = createModel(nextProps.input)
      const output = model ? solver.Solve(model) : null
      nextProps.setResult(output)

      return {
        input: nextProps.input,
        model: model,
        output: output
      }
    }

    return null
  }



  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Solver
