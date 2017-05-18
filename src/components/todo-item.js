import React from 'react'

import firebase from 'firebase'

import categories from '../constants/categories'
import difficulties from '../constants/difficulties'

const calculateDifficulty = points => {

    for (let i = difficulties.length - 1; i >= 0; i--) {

        if (points >= difficulties[i].points)
            return difficulties[i].label
    }

    return difficulties[0].label
}

const getUnauthorizedDisableProps = (user) => {

    return (!user || !user.writer) ? {

        disabled: 'disabled',
        title: 'vous n\'avez pas la permission d\'écrire'
    } : {}
}

export default ({ user, id, title, description, category: categoryIndex, points, users, date }) => {
    
    const category = categories[categoryIndex]

    const difficulty = calculateDifficulty(points)

    const join = () => {

        if (user) {

            firebase.database().ref('/todos/' + id + '/users/' + user.uid).set(user.displayName)
        }
    }

    const leave = () => {

        if (user) {

            firebase.database().ref('/todos/' + id + '/users/' + user.uid).remove()
        }
    }

    const validate = () => {

        const todoRef = firebase.database().ref('/todos/' + id)

        todoRef.once('value').then(snapshot => {
            
            const todo = snapshot.val()
            const points = todo.points
            const userListText = Object.values(todo.users).map((user, index) =>
                (index > 0 ? ' ' : '') + user.split(' ')[0].toLowerCase())

            const plural = points > 1 ? 's' : ''
            const message = 'valider la mission "' + todo.title + '" ?\n'
                + points + ' point' + plural + ' (' + category.label + ') redistribué' + plural + ' à ' + userListText

            if (confirm(message)) {
                
                const usersRef = firebase.database().ref('/users')

                let updates = {}

                usersRef.once('value', snapshot => {

                    const userList = snapshot.val()

                    Object.keys(todo.users).forEach(_user => {
                        
                        const userMeta = userList[_user]

                        updates[_user] = Object.assign({}, userMeta)

                        updates[_user]['points'][categoryIndex] += points
                    })

                    usersRef.update(updates)
                })
                    .then(() => firebase.database().ref('/_todos/' + id).set(todo))
                    .then(() => todoRef.remove())
            }
        })
    }
    
    return (
        
        <div className="todo-item">
            <h5>{ title } { 
                (
                    <span className={ 'todo-item__points todo-item__points--' + difficulty }>
                        { points }</span>
                )
            }</h5>
            <p><i>{ (new Date(date).toLocaleString()) + ' - ' }</i>{ description }</p>
            <div className="row">
                <div className="eight columns">
                    <div className={ 'category-list__item category-list__item--' + category.label }
                            title={ category.description }>
                        { category.label }</div>
                    <span><b> présent{ (users && Object.keys(users).length) > 1 ? 's' : '' } : </b></span>
                    { 
                        (users && Object.keys(users).length > 0) ? Object.values(users).map((_user, index) => {

                            return (
                                <span key={ index } className="user-name">
                                    { _user.split(' ')[0].toLowerCase() }
                                </span>
                            )
                        }) : (
                            <span><i>personne pour le moment</i></span>
                        )
                    }
                </div>
                {
                    user && users && users[user.uid] ? (
                        <button type="button" className="two columns"
                                { ...getUnauthorizedDisableProps(user) }
                                onClick={ leave }>partir</button>
                    ) : (
                        <button type="button" className="two columns"
                                { ...getUnauthorizedDisableProps(user) }
                                onClick={ join }>rejoindre</button>
                    )
                }
                <button type="button" className="two columns"
                        disabled={ !users || Object.keys(users).length === 0 }
                        { ...getUnauthorizedDisableProps(user) }
                        onClick={ validate }>valider</button>
            </div>
            <hr/>
        </div>
    )
}