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
        x1: { cutA: 5, cutB: 0, waste: 0.2 },   //how many cuts we are able to do on one plate and how much waste we it causes
        x2: { cutA: 4, cutB: 0, waste: 1 },
        x3: { cutA: 3, cutB: 1, waste: 0.5 },
        x4: { cutA: 2, cutB: 2, waste: 0.1 }
    }
}

class Solver extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            model: exampleModel
        }
    }

    componentDidMount = () => {
        let result = solver.Solve(this.state.model)
        console.log(result)
    }

    render() {
        return(
            <div>

            </div>
        )
    }


}

export default Solver
