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
    const [username, setUsername] = useState("");
    const [yourTweets, setYourTweets] = useState([])
    const [photoUrl, setPhotoUrl] = useState([""])
    const [anonUser, setAnonUser] = useState(true)
    const [userEmail, setUserEmail] = useState("")

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

        //hits tweets route pulls out all the tweets based on the users id
        function MyTweets(id) {
            fetch(`http://localhost:3003/tweets/by-user/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode:"cors",
            })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((json) => {
                console.log(json);
                setYourTweets(json);
            })
        }

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

    useEffect(() => {
        if (userObject && userObject.userName) {
            setUsername(userObject.userName);
            // console.log(username);
            MyTweets(userObject._id);
        } else {
            setUsername("");
        }
    }, [userObject])

    return(
    <Context.Provider 
        value={{
            username,
            setUsername,
            yourTweets,
            setYourTweets,
            photoUrl,
            setPhotoUrl,
            anonUser,
            setAnonUser,
            userEmail,
            setUserEmail,
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