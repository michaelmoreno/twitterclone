import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SidebarOption from './SidebarOption'

//===============================================\\
//===============Sidebar Page ===================\\
//page is the left bar on twitter used to hold   \\
// all the nav buttons. Page will need to use    \\
// <Link> from react-router-dom to be able to    \\
// switch through the pages                      \\
//===============================================\\

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <Link to='/'>
                < SidebarOption text = "home" />
                </Link>
                <Link to ='/account'>
                < SidebarOption text = "Account" />
                </Link>
                <button>Tweet</button>
            </div>
        )
    }
}
