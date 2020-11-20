import React, { useState, useEffect } from "react";
//Context page
//https://reactjs.org/docs/context.html#examples

const Context = React.createContext();
//


function ContextProvider({ children }) {

    ////////////////hooks
    const [allTweets, setAllTweets] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [tweetToReply, setTweetToReply] = useState({})
    const [tweetToEdit, setTweetToEdit] = useState({})
    const [userObject, setUserObject] = useState({});
    const [viewUserId, setViewUserId] = useState("")
    const [editTweet, setEditTweet] = useState(false)

//////////////////////////////////////////
/////////////////handle routes for tweets
    //queries user database
    function queryUsers() {
        fetch("http://localhost:3003/users")
        .then((response) => response.json())
        .then((json) => setAllUsers(json))
    }

        //handles edit
        function handleEdit(tweet) {
            setEditTweet(true);
            setTweetToEdit(tweet);
            setTweetToReply({});
        }

        //queries tweets database 
        function queryTweets() {
        fetch("http://localhost:3003/tweets")
            .then((response) => response.json())
            .then((json) => 
            {setAllTweets(json)});
    }

        //handles delete
        function handleDelete(id) {
            console.log("beginning delete", id);
            fetch(`http://localhost:3003/tweets/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                },
                mode: "cors"
            })
            .then((response) => response.json())
            .then((json) => {
                //reloads page
                queryTweets();
                console.log(json)
            })
        }
// ^ will take an id. The reply will be posted onto the tweet matching this id.


///////////hits routes inside a subcategory of Tweets controllers/tweets 127
function handleLike(id, bool) {
    fetch(`http://localhost:3003/tweets/${id}/like`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ uid: userObject._id.toString(), bool: bool}),
    })
    .then((response) => response.json())
    .then((json) => console.log("user likes updated", json, bool))
}

///////////////////////////////



    //is used to call queryTweets and queryUsers on page read
    useEffect(() => {
        queryTweets();
        queryUsers();
    })

    return(
    <Context.Provider 
        value={{
            handleDelete,
            allTweets,
            queryTweets,
            allUsers,
            queryUsers,
            handleEdit,
            tweetToReply,
            tweetToEdit,
            handleLike,
            setUserObject,
            tweetToReply,
            setTweetToReply,
            viewUserId,
            setViewUserId,
            setEditTweet,
            editTweet,
        }}>
            {children}
        </Context.Provider>
    )
} 
export {ContextProvider, Context}