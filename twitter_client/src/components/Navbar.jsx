import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { Link } from "react-router-dom";

function Navbar() {
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
    <div className="column Navbar">
      <nav className="row">
        <Link className="row leftSome" to="/account">
          {username ? `${username}'s Account` : "Sign In"}
        </Link>
        <Link className="row rightSome" to="/">
          Home
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
