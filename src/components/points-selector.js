import React, { Component } from 'react'

import difficulties from '../constants/difficulties'

const calculateDifficulty = points => {

    for (let i = difficulties.length - 1; i >= 0; i--) {
        if (points >= difficulties[i].points)
            return difficulties[i].label
    }

    return difficulties[0].label
}

const DifficultyPanel = ({ difficulty, setPointsFromDifficulty }) => {

    const difficultyItemList = [{
        label: 'simple',
        points: 5
    }, {
        label: 'moyenne',
        points: 10
    }, {
        label: 'complexe',
        points: 20
    }, {
        label: 'exceptionnelle',
        points: 50
    }].map((_difficulty, index) => (
        <div key={ index } 
                className={ 'difficulty-item difficulty-item--' + _difficulty.label + (_difficulty.label === difficulty ? ' difficulty-item--selected' : '') } 
                onClick={ () => setPointsFromDifficulty(_difficulty.points) }>
            { _difficulty.label }</div>
    ))

    return (
        <div className="eight columns">
            { difficultyItemList }
        </div>
    )    
}

class PointsSelector extends Component {

    constructor({ defaultValue }) {

        super()

        this.state = {
            points: defaultValue || 5,
            difficulty: 'simple'
        }
    }

    componentWillReceiveProps(nextProps) {

        const { defaultValue } = nextProps

        if (defaultValue !== this.props.defaultValue)
            this.setState({ 
                points: defaultValue,
                difficulty: calculateDifficulty(defaultValue)
            })
    }

    handlePointsUpdate(points) {

        this.props.updatePoints(points)
        this.setState({ 
            points,
            difficulty: calculateDifficulty(points) 
        })
    }
    
    handleChange(e) {
        
        this.handlePointsUpdate(e.target.value)
    }

    render() {

        console.log(this.state)

        return (
            <div className="row point-selector">
                <input type="number" className="four columns" placeholder="points" value={ this.state.points }
                        onChange={ this.handleChange.bind(this) } />
                <DifficultyPanel difficulty={ this.state.difficulty }
                    setPointsFromDifficulty={ this.handlePointsUpdate.bind(this) }/>
            </div>
        );
    }
}

export default PointsSelector;
