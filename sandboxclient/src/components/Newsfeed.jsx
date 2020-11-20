import React, { Component, useContext } from 'react'
import { Context } from '../Context.jsx'
import Tweet from './Tweet.jsx';

function Newsfeed() {
const {
    allTweets
} = useContext(Context);
    return (
        <div className = 'newsfeed'>
            News Feed Page
            <div>
            {allTweets.map((tweet) => {
                return <Tweet tweet={tweet}/>
            })}
            </div>
        </div>
    )
}
export default Newsfeed