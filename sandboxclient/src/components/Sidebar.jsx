import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'
import SidebarOption from './SidebarOption'

//===============================================\\
//===============Sidebar Page ===================\\
//page is the left bar on twitter used to hold   \\
// all the nav buttons. Page will need to use    \\
// <Link> from react-router-dom to be able to    \\
// switch through the pages. Page will need some \\
//context to know if the user is logged in or not\\
//so it can display sign in or tweet             \\
//===============================================\\

function Sidebar() {
    const{
        username
    } = useContext(Context);

    return(            
    <div className="sidebar">
    <Link to='/'>
    < SidebarOption text = "home" />
    </Link>
    <Link to ='/account'>
    < SidebarOption/>
    <h2>
    {username? `${username}` : 'sign in' }
    </h2>
    </Link>
    <button>Tweet</button>
</div>
    )
}

export default Sidebar