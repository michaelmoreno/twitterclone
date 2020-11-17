import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";

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
  } = useContext(Context);

  const [tweetText, setTweetText] = useState("");

  function publishTweet() {
    fetch("https://localhost:3003/tweets", {
      method: "POST",
      "Content-type": "application/json",
      body: JSON.stringify({ tweetText, userEmail }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <div className="row app">
      <input
        type="textarea"
        value={tweetText}
        onChange={(e) => {
          setTweetText(e.target.value);
        }}
        placeholder="Your Name"
      ></input>
      <button
        type="button"
        disabled={!username}
        onClick={() => {
          publishTweet();
        }}
      >
        Post Tweet
      </button>
    </div>
  );
}

export default NewTweet;
