import React, { Component } from 'react'

import firebase from 'firebase'
import firebaseList from '../modules/firebase-list'

import TodoItem from './todo-item'
import TodoFilters from './todo-filters'

class TodoList extends Component {

    componentWillMount() {

        firebase.database().ref('/todos/').on('value', snapshot => {

            const todos = firebaseList(snapshot.val())

            this.setState({ 
                todos,
                filteredTodos: todos
            })
        })
    }

    updateFilteredTodos(filteredTodos) {

        this.setState({ filteredTodos })
    }

    render() {

        const todoList = ((this.state && this.state.filteredTodos) ?
            this.state.filteredTodos : [])
                .sort((a, b) => {
                    
                    return b.date - a.date
                })
                .map((value, index) => (
                    <TodoItem key={ index } user={ this.props.user} { ...value } />
                ))

        return (
            <div>
                <TodoFilters todos={ (this.state && this.state.todos) ? this.state.todos : [] } 
                        updateFilteredTodos={ this.updateFilteredTodos.bind(this) } />
                <h4 className="todo-list__title">missions en cours</h4>
                { todoList }
            </div>
        )
    }
}

export default TodoList;
