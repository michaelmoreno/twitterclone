import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context.jsx";
import Navbar from "./components/Navbar";
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
      <Navbar />
      <Feed />
      <Navbar />
    </div>
  );
}

export default App;
