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

  const [tweetToReply, setTweetToReply] = useState({});

  //

  const [editTweet, setEditTweet] = useState(false);

  function handleDelete(id) {
    fetch(`http://localhost:3003/tweets/${id}`, {
      method: "DELETE",
      "Content-type": "application/json",
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

  useEffect(() => {
    queryTweets();
  }, []);

  function handleLike(id) {
    fetch(`http://localhost:3003/tweets/${id}`, {
      method: "POST",
      "Content-type": "application/json",
      body: JSON.stringify({ userEmail }),
    })
      .then((response) => response.json())
      .then((json) => {
        queryTweets();
        console.log(json);
      });
  }

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
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { ContextProvider, Context };
