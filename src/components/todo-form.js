import React, { Component } from 'react'

import CategorySelector from './category-selector'
import PointsSelector from './points-selector'

import firebase from 'firebase'

const emptyForm = {
    title: null,
    description: null,
    category: null,
    points: null
}

const getUnauthorizedDisableProps = (user) => {

    return (!user || !user.writer) ? {

        disabled: 'disabled',
        title: 'vous n\'avez pas la permission d\'écrire'
    } : {}
}

class TodoForm extends Component {

    componentWillMount() { 

        this.setState(Object.assign({}, emptyForm, {

            open: false,
            todosRef: firebase.database().ref('todos') 
        }))
    }

    submitForm() {

        const { title, description, category, points } = this.state

        if (title && category && points)
            this.state.todosRef.push({ title, description, category, points, date: Date.now() })
    }

    updateCategory(category) {
        
        this.setState({ category })
    }

    updatePoints(points) {
        
        this.setState({ points})
    }

    render() {

        const { user } = this.props
        const { open, title, category, points } = this.state

        return open ? (
            <div>
                <h4 className="todo-form__title">ajouter une mission</h4>
                <div className="row">
                    <input type="text" placeholder="titre" className="twelve columns"
                            value={ this.state.title || '' }
                            onChange={ (e) => this.setState({ title: e.target.value }) } />
                </div>
                <div className="row">
                    <textarea  placeholder="description" className="twelve columns"
                            value={ this.state.description || '' }
                            onChange={ (e) => this.setState({ description: e.target.value }) }>
                    </textarea>
                </div>
                <CategorySelector defaultValue={ category } 
                        updateCategory={ this.updateCategory.bind(this) } />
                <PointsSelector defaultValue={ points } 
                        updatePoints={ this.updatePoints.bind(this) } />
                <div className="row">
                    <button type="button" className="four columns"
                            onClick={ () => this.setState(Object.assign({}, { open: false })) }>
                        réduire</button>
                    <button type="button" className="four columns"
                            onClick={ () => this.setState(Object.assign({}, emptyForm)) }>
                        effacer</button>
                    <button type="button" className="four columns"
                            disabled={ !title || !category }
                            { ...getUnauthorizedDisableProps(user) }
                            onClick={ () => this.submitForm() } >
                        envoyer</button>
                </div>
            </div>
        ) : (
            <div className="row">
                <button type="button" className="twelve columns"
                        { ...getUnauthorizedDisableProps(user) }
                        onClick={ () => this.setState({ open: true }) }>
                    ajouter une mission</button>
            </div>
        )
    }
}

export default TodoForm;
