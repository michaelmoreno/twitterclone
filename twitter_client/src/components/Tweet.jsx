import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context.jsx";

function Tweet(props) {
  let tweet = props.tweet;

  let hide = props.hideReplies;

  // {tweet.replies.map((reply) => {
  //     <div className="reply">
  //       <h4>{reply.authorName}</h4>
  //       <h4>{reply.text}</h4>
  //       <h4>{reply.dateCreated}</h4>
  //     </div>;
  //   })}

  const {
    setTweetToReply,
    handleDelete,
    handleLike,
    userObject,
    username,
    allTweets,
    allUsers,
    setViewUserId,
  } = useContext(Context);

  const [allReplies, setAllReplies] = useState([]);

  const [hideReplies, setHideReplies] = useState(false);

  useEffect(() => {
    if (hide) {
      setHideReplies(true);
    }
  }, []);

  useEffect(() => {
    let newArr = [];

    allTweets.forEach((i) => {
      if (tweet.replies.includes(i._id)) {
        newArr.push(i);
      }
    });

    setAllReplies(newArr);
  }, [allTweets]);

  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    console.log("running effect");
    allUsers.map((user) => {
      console.log(user);
      if (tweet.author.toString() == user._id.toString()) {
        console.log(user);
        setUserPhoto(user.photoUrl);
      }
    });
  }, [hideReplies]);

  return (
    <div className="column tweetBody">
      <div className="op">
        <div className="row">
          <div className="row spaceAround">
            <img src={`${userPhoto}`} className="tinyPhoto leftBit"></img>
            <Link
              className="leftBit"
              to={`/user/${tweet.author}`}
              onClick={() => {
                setViewUserId(tweet.author);
              }}
            >
              <h3>{tweet.authorName}</h3>
            </Link>
          </div>
          {tweet.createdAt && (
            <p className="rightBit">
              Created: {tweet.createdAt.substring(0, 10)}
            </p>
          )}
        </div>
        <p className="tweetText">{tweet.text}</p>
        <p>{tweet.dateCreated}</p>
        <p
          onClick={() => {
            handleLike(tweet._id);
          }}
        >{`<3: ${tweet.likes.length}`}</p>
        <div
          className="column"
          style={{
            display: `${
              userObject && userObject._id === tweet.author ? "initial" : "none"
            }`,
          }}
        >
          <button onClick={() => handleDelete(tweet._id)}>Delete</button>
          <button>Edit</button>
        </div>
      </div>
      {userObject && userObject._id !== tweet.author && (
        <Link to="/tweet">
          <button type="button" onClick={() => setTweetToReply(tweet)}>
            Reply to Tweet
          </button>
        </Link>
      )}
      <div className="reply">
        <p>Replies:</p>
        {!hideReplies &&
          allReplies.map((reply) => {
            return <Tweet tweet={reply} />;
          })}
      </div>
      <button
        // onLoad={() => handleReplies()}
        onClick={() => setHideReplies(!hideReplies)}
        type="button"
      >
        {hideReplies ? "Show Replies" : "Hide Replies"}
      </button>
    </div>
  );
}

export default Tweet;
