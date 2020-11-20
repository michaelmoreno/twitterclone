import React, { Component, useContext } from 'react'
import { Context } from '../Context.jsx'
import Tweet from './Tweet.jsx';

//============================================\\
//===============Newsfeed Page================\\
//Newsfeed is a page that for right now is    \\
//used to display all of the tweets in the db \\
//it should be a simple page that maps all of \\
//the tweets. Not much should be need because \\
//all of the magic should be happening in it's\\
//child component <Tweet>                     \\
//============================================\\

function Newsfeed() {
const {
    allTweets
} = useContext(Context);
    return (
        <div id="homePageTweets" className = 'newsfeed'>
            News Feed Page
            <div >
            {allTweets.map((tweet) => {
                return <Tweet tweet={tweet}/>
            })}
            </div>
        </div>
    )
}
export default Newsfeed