import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { Link } from "react-router-dom";

function NewTweet() {
  const {
    username,
    userEmail,
    setUsername,
    photoUrl,
    setPhotoUrl,
    userObject,
    setUserObject,
    anonUser,
    setAnonUser,
    allTweets,
    handleLike,
    editTweet,
    setEditTweet,
    queryTweets,
  } = useContext(Context);

  const [tweetText, setTweetText] = useState("");

  function publishTweet() {
    console.log("publish tweet clicked");
    fetch("http://localhost:3003/tweets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        author: userObject._id,
        userEmail,
        text: tweetText,
        authorName: username,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        queryTweets();
      });
  }

  return (
    <div className="row app">
      <br></br>
      <input
        className="textBox"
        type="textarea"
        value={tweetText}
        onChange={(e) => {
          setTweetText(e.target.value);
        }}
        placeholder="What would you like to say"
      ></input>
      <Link to="/account">
        <button
          type="button"
          disabled={!username}
          onClick={() => {
            publishTweet();
          }}
        >
          Post Tweet
        </button>
      </Link>
      <br></br>
    </div>
  );
}

export default NewTweet;
