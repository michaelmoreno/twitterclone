import React, { useState, useEffect } from "react";
//Context page
//https://reactjs.org/docs/context.html#examples

const Context = React.createContext();
//


function ContextProvider({ children }) {

    const [allTweets, setAllTweets] = useState([])
    const [allUsers, setAllUsers] = useState([])

    //queries tweets database 
    function queryTweets() {
    fetch("http://localhost:3003/tweets")
        .then((response) => response.json())
        .then((json) => 
        {setAllTweets(json)});
}

    //queries user database
    function queryUsers() {
        fetch("http://localhost:3003/users")
        .then((response) => response.json())
        .then((json) => setAllUsers(json))
    }

    useEffect(() => {
        queryTweets();
        queryUsers();
    })

    return(
    <Context.Provider 
        value={{
            allTweets,
            queryTweets,
            allUsers,
            queryUsers,
        }}>
            {children}
        </Context.Provider>
    )
} 
export {ContextProvider, Context}