import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context.jsx";

function Tweet(props) {


    let tweet = props.tweet;

    let hide = props.hideReplies

          //hooks used only on tweet page not need on context.jsx
        const [userPhoto, setUserPhoto] = useState("");
        const [isLiked, setIsLiked] = useState(false);
        const [likesNumber, setLikesNumber] = useState(0);
        const [allReplies, setAllReplies] = useState([]);
        const [hideReplies, setHideReplies] = useState(false);

    const {
        allTweets,
        allUsers,
        handleDelete,
        handleEdit,
        handleLike,
        userObject,
        setViewUserId,
        setTweetToReply,
    } = useContext(Context);

    //Use Effects
    useEffect(() => {
        console.log("running effect");
        allUsers.map((user) => {
        console.log(user);
        if (
            tweet.author &&
            user._id &&
            tweet.author.toString() == user._id.toString()
        ) {
            console.log(user);
            setUserPhoto(user.photoUrl);
        }
        });
    }, [hideReplies]);
    
    useEffect(() => {
        if (tweet.likes) {
        setLikesNumber(tweet.likes.length);
        }
    }, []);
    
    useEffect(() => {
        if (hide) {
        setHideReplies(true);
        }
    }, []);
    
    useEffect(() => {
        let newArr = [];
        allTweets.forEach((i) => {
        if (tweet.replies && tweet.replies.includes(i._id)) {
            newArr.push(i);
        }
        });
        setAllReplies(newArr);
    }, [allTweets]);

    function toggleLiked() {
        if (userObject && userObject._id) {
        if (isLiked) {
            setLikesNumber(likesNumber - 1);
        } else {
            setLikesNumber(likesNumber + 1);
        }
        handleLike(tweet._id, !isLiked);
        setIsLiked(!isLiked);
        }
    }

    return(
<div className="column tweetBody">
      <div className="op">

        <div className="row">

        {/* top most part of tweet body, displays the author and their photo */}
          <div className="row spaceAround">
            {/* img src for the tweet author */}
            <img src={`${userPhoto}`} className="tinyPhoto leftBit"></img>
            {/* links to the tweet authors user page */}
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
              {/* Shows date tweet as made beneath user and picture */}
          {tweet.createdAt && (
            <p className="rightBit">
              Created: {tweet.createdAt.substring(0, 10)}
            </p>
          )}
        </div>


            {/* honestly not sure but it has some condition rendering */}
        <p className="tweetText">
          {props.editing ? `${props.editing}` : tweet.text}
        </p>
        <p>{tweet.dateCreated}</p>


            {/* span tag for the like button and image */}
        <span
          className="inline"
          onClick={() => {
            toggleLiked();
          }}
        >
          <img
            className="teensyImg"
            src={`${
              isLiked
                ? "https://i.ibb.co/bRgYpnt/heart-full.png"
                : "https://i.ibb.co/26SJ4Hd/heart.png"
            }`}
          ></img>
          <p className="likeNumber">{likesNumber}</p>
        </span>

            {/* more conditional logic that I might not see because I'm not logged in */}
        <div
          className="column leftMore"
          style={{
            display: `${
              userObject && userObject._id === tweet.author ? "initial" : "none"
            }`,
          }}
        >
          <button onClick={() => handleDelete(tweet._id)}>Delete</button>
          <Link to="/tweet">
            <button onClick={() => handleEdit(tweet)}>Edit</button>
          </Link>
        </div>

      </div>


      {userObject && userObject._id !== tweet.author && (
        <Link to="/tweet">
          <button type="button" onClick={() => setTweetToReply(tweet)}>
            Reply to Tweet
          </button>
        </Link>
      )}

        {/* show replies base on value of hideReplies */}
      <div className="reply">
        <p>Replies:</p>
        {!hideReplies &&
          allReplies.map((reply) => {
            return <Tweet tweet={reply} />;
          })}
      </div>

          {/* on click toggle the value of hideReplies to whatever it isn't */}
      <button onClick={() => setHideReplies(!hideReplies)} type="button">
        {hideReplies ? "Show Replies" : "Hide Replies"}
      </button>
    </div>
    )
}

  export default Tweet;
