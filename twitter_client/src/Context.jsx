import React, { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [userObject, setUserObject] = useState({});
  const [anonUser, setAnonUser] = useState(true);
  const [allTweets, setAllTweets] = useState([]);

  const [yourTweets, setYourTweets] = useState([]);
  const [tweetToReply, setTweetToReply] = useState({});

  //

  const [editTweet, setEditTweet] = useState(false);

  function handleDelete(id) {
    console.log("beginning delete", id);
    fetch(`http://localhost:3003/tweets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => {
        queryTweets();
        console.log(json);
      });
  }
  // ^ will take an id. The reply will be posted onto the tweet matching this id.

  function queryTweets() {
    fetch("http://localhost:3003/tweets")
      .then((response) => response.json())
      .then((json) => setAllTweets(json));
  }

  function myTweets(id) {
    fetch(`http://localhost:3003/tweets/by-user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setYourTweets(json);
      });
  }

  useEffect(() => {
    queryTweets();
  }, []);

  function handleLike(id) {
    fetch(`http://localhost:3003/tweets/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    })
      .then((response) => response.json())
      .then((json) => {
        queryTweets();
        console.log(json);
      });
  }

  useEffect(() => {
    if (userObject && userObject.userName) {
      setUsername(userObject.userName);
      console.log(username);

      myTweets(userObject._id);
    } else {
      setUsername("");
    }
  }, [userObject]);

  useEffect(() => {
    if (userObject && userObject.userName) {
      myTweets(userObject._id);
    }
  }, [allTweets]);

  return (
    <Context.Provider
      value={{
        username,
        setUsername,
        photoUrl,
        setPhotoUrl,
        userObject,
        setUserObject,
        anonUser,
        setAnonUser,
        allTweets,
        userEmail,
        setUserEmail,
        handleLike,
        tweetToReply,
        setTweetToReply,
        editTweet,
        setEditTweet,
        handleDelete,
        yourTweets,
        setYourTweets,
        queryTweets,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { ContextProvider, Context };
