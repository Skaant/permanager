import React, { Component } from 'react';

import Header from './header'
import TodoForm from './todo-form'
import TodoList from './todo-list'

import * as firebase from 'firebase'
import firebaseConfig from '../constants/firebase'

firebase.initializeApp(firebaseConfig)

const parseUserForState = (user, setState) => 

    firebase.database().ref('/users/' + user.uid).on('value', snapshot => {
        
        setState({ user: Object.assign({}, { ...user }, { ...snapshot.val() }) })
    })

class App extends Component {

    constructor() {
        
        super()

        this.state = { 
            providers: { google: new firebase.auth.GoogleAuthProvider() },
            user: null
        }
    }

    componentWillMount() {

        const self = this

        let user = firebase.auth().currentUser

        if (user && user.uid) parseUserForState(user, this.setState.bind(this))
        
        else {

            firebase.auth().onAuthStateChanged(_user => {
                
                if (_user && _user.uid) parseUserForState(_user, self.setState.bind(self))
                
                else self.setState({ user: null })
            });
        }

        firebase.auth().getRedirectResult().then(function(result) {
            
            var _user = result.user

            if (_user && _user.uid) parseUserForState(_user, self.setState.bind(self))
        })
    }

    connect() {

        firebase.auth().signInWithRedirect(this.state.providers.google)
    }

    disconnect() {

        firebase.auth().signOut()
    }

    render() {

        const user = this.state.user

        return (
            <div className="container">
                <Header user={ user } connect={ this.connect.bind(this) } disconnect={ this.disconnect.bind(this) } />
                <h1 className="app-title">permanager</h1>
                <h3 className="app-subtitle">aux jardins de la flemme</h3>
                <TodoForm  user={ user }/>
                <TodoList user={ user } />
            </div>
        );
    }
}

export default App;
