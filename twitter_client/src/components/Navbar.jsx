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
    setDarkMode,
    darkMode,
    searchVal,
    setSearchVal,
    matchingTweets,
    setMatchingTweets
  } = useContext(Context);



  const handleSearch = () => {
    console.log(allTweets)
    let matchTweets = allTweets.filter(tweet =>
      ((tweet.text && tweet.text.includes(searchVal)) || (tweet.authorName && tweet.authorName.includes(searchVal))))
    setMatchingTweets(matchTweets)
  }

  return (
    <div className="column Navbar">
      <nav className="row">

        {/* img tag to handle darkmode */}
        <img
          className="teensyImg leftBit"
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
{/*  */}

{/* search bar to filter through tweets */}
        <input 
          type="text" 
          value={searchVal} 
          onChange={(e) => {
            setSearchVal(e.target.value); 
            handleSearch()}} 
          placeholder="Search Site"></input>


{/* sign in and home page links */}
        <Link className="row leftSome heavy" to="/account">
          {username ? `${username}'s Account` : "Sign In"}
        </Link>
        <Link className="row rightSome heavy" to="/">
          Home
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
