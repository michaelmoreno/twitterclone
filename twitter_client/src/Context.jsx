import React, { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
const Context = React.createContext();

function ContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [userObject, setUserObject] = useState({});
  const [anonUser, setAnonUser] = useState(true);
  //
  const [allTweets, setAllTweets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

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

  function queryUsers() {
    fetch("http://localhost:3003/users")
      .then((response) => response.json())
      .then((json) => setAllUsers(json));
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
    queryUsers();
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

  function getUser(id) {
    let user;
    fetch(`http://localhost:3003/tweets/${id}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        user = json;
        return json;
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
    console.log(allTweets);
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
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { ContextProvider, Context };
