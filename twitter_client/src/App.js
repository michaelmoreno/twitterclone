import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Context } from "./Context.jsx";
import Newsfeed from "./components/Newsfeed";
import Account from "./components/Account";

import Navbar from "./components/Navbar";
import NewReply from "./components/NewReply";
import NewTweet from "./components/NewTweet";

// two models: one for authentication and one for tweets

// authentication. database. server. ability to post tweets and their replies. Phone auth. Dark mode.

function App() {
  const {
    username,
    setUsername,
    photoUrl,
    setPhotoUrl,
    userObject,
    setUserObject,
    anonUser,
    setAnonUser,
    allTweets,
    handleLike,
  } = useContext(Context);

  return (
    <div id="container">
      <Navbar className="Navbar" />
      <div className="row">
        <Switch>
          <Route exact path="/">
            <Newsfeed />
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
        </Switch>
      </div>
      <Navbar className="Navbar" />
    </div>
  );
}

export default App;
