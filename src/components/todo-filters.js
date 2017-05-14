import React, { Component } from 'react'

import CategorySelector from './category-selector'

const filters = {
    title: (todos, title) => todos.filter(todo => todo.title.includes(title)),
    user: (todos, user) => todos.filter(todo => 
        todo.users && Object.values(todo.users).toString().toLowerCase().includes(user)),
    categories: (todos, categories) => todos.filter(todo => {

        const categoryList = todo.categoryList

        for (let i = 0; i < categoryList.length; i++) {
            
            if (categories.includes(categoryList[i]))
                return true
        }

        return false
    })
}

const emptyFilters = {
        title: false,
        user: false,
        categories: [0, 1, 2, 3, 4, 5, 6, 7]
}

export default class TodoFilters extends Component { 
    
    constructor() {

        super()

        this.state = Object.assign({}, emptyFilters, { open: false })
    }

    componentWillUpdate(nextProps, nextState) {

        if ((this.state && (this.state !== nextState))
                || ((this.state.categories && nextState.categories) 
                    && (this.state.categories.toString() !== nextState.categories.toString()))) {

            let filteredTodos = this.props.todos

            if (nextState.title) 
                filteredTodos = filters.title(filteredTodos, nextState.title)

            if (nextState.user) 
                filteredTodos = filters.user(filteredTodos, nextState.user)          
            
            filteredTodos = filters.categories(filteredTodos, (nextState.categories || [])) 

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
    
    updateCategories(categories) {
        
        this.setState({ categories })
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
                                defaultValue={ this.state.categories }
                                updateCategories={ this.updateCategories.bind(this) } />
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