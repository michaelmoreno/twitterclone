import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { Link } from "react-router-dom";
import Tweet from "./Tweet.jsx";

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
    tweetToReply,
    setTweetToReply,
  } = useContext(Context);

  const [tweetText, setTweetText] = useState("");

  function publishTweet() {
    let thisTweetId;
    console.log("publish tweet clicked");
    fetch("http://localhost:3003/tweets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        author: userObject._id.toString(),
        userEmail,
        text: tweetText,
        authorName: username,
        replyTo: tweetToReply._id || "",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        let id = json._id;

        if (tweetToReply._id) {
          fetch("http://localhost:3003/tweets/reply", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
              originalId: tweetToReply._id.toString(),
              replyId: json._id.toString(),
            }),
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
        }
        fetch(`http://localhost:3003/users/newPost/${userObject._id}/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
        setTweetToReply({});
        queryTweets();
      });
  }

  return (
    <div className="row app">
      {tweetToReply._id && (
        <div>
          <h4>Replying to this tweet:</h4>
          <Tweet tweet={tweetToReply} hideReplies={true} />
        </div>
      )}
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
      {tweetToReply._id && (
        <button onClick={() => setTweetToReply({})}>Cancel Reply</button>
      )}
      <br></br>
    </div>
  );
}

export default NewTweet;
