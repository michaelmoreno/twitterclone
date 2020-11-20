import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context.jsx";

function Tweet(props) {


    let tweet = props.tweet;

    const {
        allTweets,
    } = useContext(Context);

    return(
        <div>
            Tweet page
        <div> {tweet.authorName} </div>
        </div>
    
    )
}

  export default Tweet;
