import React from 'react'

import categories from '../constants/categories'

export default ({ user, disconnect, connect }) => {
    
    return (
        <div className="header row">
            <p className="eight columns">
                bonjour{ user ? ' ' + user.displayName.split(' ')[0].toLowerCase() : '' }
                {
                    user ? Object.keys(user.points).map((categoryId, index) => (
                        <span key={ index } title={ categories[categoryId].label + ' : ' + categories[categoryId].description }
                                className={ 'header-user__points header-user__points--' + categories[categoryId].label }>
                            { user.points[categoryId] }</span>
                    )) : (
                        <i>, connectez-vous</i>
                    )
                }
            </p>
            { 
                user ? (
                    <button type="button" className="four columns"
                            onClick={ disconnect }>
                        deconnexion</button>
                ) : (
                    <button type="button" className="four columns"
                            onClick={ connect }>
                        connexion</button>
                )
            }
        </div>
    )
}