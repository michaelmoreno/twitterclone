import React, { Component } from 'react'
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
                < SidebarOption text = "home" />
                < SidebarOption text = "Account" />
                <button>Tweet</button>
            </div>
        )
    }
}