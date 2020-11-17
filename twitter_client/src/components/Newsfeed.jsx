import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context.jsx";

function Newsfeed() {
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
    editTweet,
    setEditTweet,
    tweetToReply,
    setTweetToReply,
  } = useContext(Context);
  return (
    <div id="homePageTweets" className="app">
      <h2>Welcome to Better Twitter!</h2>
      <h3>Newsfeed:</h3>
      {allTweets.map((tweet) => {
        return (
          <div className="column">
            <div className="op">
              <h3>{tweet.author}</h3>
              <p>{tweet.text}</p>
              <p>{tweet.dateCreated}</p>
              <p
                onClick={() => {
                  handleLike(tweet._id);
                }}
              >{`<3: ${tweet.likesCount}`}</p>
              <div
                className="column"
                style={{
                  display: `${
                    userObject._id === tweet.author ? "initial" : "none"
                  }`,
                }}
              >
                <button>Delete</button>
                <button>Edit</button>
              </div>
            </div>
            {tweet.replies.map((reply) => {
              <div className="reply">
                <h4>{reply.author}</h4>
                <h4>{reply.text}</h4>
                <h4>{reply.dateCreated}</h4>
              </div>;
            })}
            <Link to="/reply">
              <button type="button" onClick={() => setTweetToReply(tweet)}>
                Reply
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Newsfeed;
