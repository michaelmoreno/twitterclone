import React, { Component } from 'react'
import NewReply from "./NewReply";
import NewTweet from "./NewTweet";
import EditAccount from "./EditAccount";
import Newsfeed from "./Newsfeed";
import Account from "./Account";
import ViewUser from "./ViewUser";
import { Link, Switch, Route } from "react-router-dom";

export default class Feed extends Component {
    render() {
        return (
            <div className="feed">
            <Switch>
          <Route exact path="/">
            <Newsfeed />
          </Route>
          <Route path="/account/edit">
            <EditAccount />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/tweet">
            <NewTweet />
          </Route>
          <Route path="/reply">
            <NewReply />
          </Route>
          <Route path="/user">
            <ViewUser />
          </Route>
        </Switch>
            </div>
        )
    }
}
