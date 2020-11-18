import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Context } from "./Context.jsx";
import Newsfeed from "./components/Newsfeed";
import Account from "./components/Account";
import ViewUser from "./components/ViewUser";

import Navbar from "./components/Navbar";
import NewReply from "./components/NewReply";
import NewTweet from "./components/NewTweet";
import EditAccount from "./components/EditAccount";
import Feed from "./components/Feed";

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
    darkMode,
  } = useContext(Context);

  return (
    <div
      className="appMain"
      style={{ backgroundColor: `${darkMode ? "black" : "white"}` }}
    >
      <Navbar className="Navbar" />
      <Feed />
      {/* <Switch>
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
        </Switch> */}
      <Navbar className="Navbar" />
    </div>
  );
}

export default App;
