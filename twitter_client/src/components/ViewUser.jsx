import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { Link } from "react-router-dom";
import Tweet from "./Tweet";
import sha256 from "crypto-js/sha256";

function ViewUser(props) {
  let uid = props.userId;

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
    userEmail,
    setUserEmail,
    yourTweets,
    yourReplies,
    handleDelete,
  } = useContext(Context);

  const [viewingUser, setViewingUser] = useState({});

  // have to populate yourtweets and yourreplies
  return (
    <div className="row app">
      <h2>{username ? `${username}'s Account` : ""}</h2>
      {userAlreadyExists && <h4>User Already Exists!</h4>}
      {userObject && userObject.userName ? (
        <div>
          <h4>Username: {userObject.userName}</h4>
          <h4>Email: {userObject.email}</h4>
          <div className="row">
            <img src={userObject.photoUrl}></img>
            <div className="column">
              <Link to="/tweet">
                <button>Create Tweet</button>
              </Link>
              <button onClick={() => setUserObject({})}>Sign Out</button>
            </div>
          </div>
          <div>
            <h5>Your Tweets</h5>
            <ul>
              {yourTweets &&
                yourTweets.map((tweet) => {
                  return <Tweet tweet={tweet} />;
                })}
            </ul>
          </div>
          <div>
            <h5>Replies To You</h5>
            <ul>
              {yourReplies &&
                yourReplies.map((reply) => {
                  return (
                    <div>
                      <p>Replying to {`${reply.tweetToReply.author}`}</p>
                      <p>{reply.text}</p>
                      <p>{reply.dateCreated}</p>
                      <button
                        type="button"
                        onClick={() => {
                          handleDelete(reply._id, "reply");
                        }}
                      >
                        Delete Reply
                      </button>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : (
        <div id="createAccountScreen">
          <>
            <button
              type="button"
              onClick={() => {
                setCreateAccount(true);
                setSignIn(false);
              }}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setSignIn(true);

                setCreateAccount(false);
              }}
            >
              Sign In
            </button>
          </>
          <div
            style={{
              display: `${createAccount || signIn ? "initial" : "none"}`,
              // borderRadius: "25px",
              // width: "50vw",
              // backgroundColor: "rgb(57, 224, 227, 0.9)",
            }}
          >
            <span className="row">
              <h4 className="leftBit"></h4>
              <button
                className="rightBit"
                onClick={() => {
                  setCreateAccount(false);
                  setSignIn(false);
                }}
              >
                x
              </button>
            </span>
            <br></br>
            <div className="column">
              {!signIn && (
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => {
                    setInputUsername(e.target.value);
                  }}
                  placeholder="Your Name"
                ></input>
              )}
              <input
                type="text"
                value={inputEmail}
                onChange={(e) => {
                  setInputEmail(e.target.value);
                }}
                placeholder="Email"
              ></input>
              <input
                type="text"
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                }}
                placeholder="Password"
              ></input>
              {!signIn && (
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                  placeholder="Photo URL"
                ></input>
              )}
              <br></br>
              <button
                onClick={() => {
                  handleAccountRequest();
                }}
              >
                {signIn ? "Sign In" : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewUser;
