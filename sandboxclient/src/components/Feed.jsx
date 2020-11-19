import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Accounts from './Accounts'
import Newsfeed from './Newsfeed'

//=================================================\\
//===================Feed Page=====================\\
//The feed is used as the main display on twitter  \\
//this page will need react-router-dom to switch   \\
//between pages. <Switch> wraps all <Route>        \\
//route path is url path. What is defined between  \\
//<Route> is what page jsx is shown in our feed    \\
//=================================================\\

export default class Feed extends Component {
    render() {
        return (
            <div className="feed">
                
                <Switch>
                    <Route exact path= '/'>
                        <Newsfeed />
                    </Route>
                    <Route path='/account'>
                        <Accounts />
                    </Route>
                </Switch>

            </div>
        )
    }
}
