import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { Link } from "react-router-dom";
import NavbarOptions from './NavbarOptions'

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
    setDarkMode,
    darkMode,
  } = useContext(Context);
  return (
    <div className= "Navbar">

        <img
          style={{ width: "2vw" }}
          src={
            darkMode
              ? "https://i.ibb.co/6Pq9yhP/sun.png"
              : "https://i.ibb.co/zZSVYp3/muslim.png"
          }
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        ></img>

    <Link to="/">
    <NavbarOptions text="Home" />
    </Link>

    <Link to="/account">
    {username ? `${username}'s Account` : <NavbarOptions text="sign in" />}
    </Link>

    {/* </div> */}
    
    {/* //Jesse's code */}
    </div>
    
  );
}

export default Navbar;
