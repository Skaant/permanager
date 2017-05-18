import React, { Component } from 'react'

import CategorySelector from './category-selector'

const filters = {
    title: (todos, title) => todos.filter(todo => todo.title.includes(title)),
    user: (todos, user) => todos.filter(todo => 
        todo.users && Object.values(todo.users).toString().toLowerCase().includes(user)),
    category: (todos, category) => todos.filter(todo => todo.category === category)
}

const emptyFilters = {
        title: false,
        user: false,
        category: false
}

export default class TodoFilters extends Component { 
    
    constructor() {

        super()

        this.state = Object.assign({}, emptyFilters, { open: false })
    }

    componentWillUpdate(nextProps, nextState) {

        if (this.state && this.state !== nextState) {

            let filteredTodos = this.props.todos

            if (nextState.title) 
                filteredTodos = filters.title(filteredTodos, nextState.title)

            if (nextState.user) 
                filteredTodos = filters.user(filteredTodos, nextState.user)          
            
            if (nextState.category || nextState.category === 0)
                filteredTodos = filters.category(filteredTodos, nextState.category) 

            this.props.updateFilteredTodos(filteredTodos)
        }
    }

    handleTitleChange(e) {

        this.setState({ title: e.target.value })
    }

    handleUserChange(e) {

        this.setState({ user: e.target.value })
    }

    handleMinChange(e) {

        this.setState({ min: e.target.value })
    }

    handleMaxChange(e) {

        this.setState({ max: e.target.value })
    }
    
    updateCategory(category) {
        
        this.setState({ category })
    }

    render() {

        const { open } = this.state

        return open ? (
            <div className="todo-filters">
                <h4 className="todo-filters__title">filtrer les missions</h4>
                <div className="row">
                    <div className="four columns filter-list">
                        <input type="text" className="filter-item" placeholder="contenu dans le titre"
                                value={ this.state.title || '' }
                                onChange={ this.handleTitleChange.bind(this) } />
                        <input type="text" className="filter-item" placeholder="utilisateur présent"
                                value={ this.state.user || '' }
                                onChange={ this.handleUserChange.bind(this) } />
                    </div>
                    <div className="eight columns filter-categories">
                        <CategorySelector fullySelected={ true } 
                                defaultValue={ this.state.category }
                                updateCategory={ this.updateCategory.bind(this) } />
                    </div>
                </div>
                <div className="row">
                    <div className="four columns">&nbsp;</div>
                    <button type="button" className="four columns"
                            onClick={ () => this.setState({ open: false }) }>
                        réduire</button>
                    <button type="button" className="four columns"
                            onClick={ () => this.setState(emptyFilters) }>
                        effacer</button>
                </div>
            </div>
        ) : (
            <div className="row">
                <button type="button" className="twelve columns"
                        onClick={ () => this.setState({ open: true }) }>
                    filtrer les missions</button>
            </div>
        )
    }
}