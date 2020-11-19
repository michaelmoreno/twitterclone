import React, { Component } from 'react'


//page literally just diplays what text is defined as from the parent element
//split it into a seperate component to help it all stack so it looks right


function SidebarOption({text}) {
    return(
        <div>
            <h2>{text}</h2>
        </div>
    )
}
export default SidebarOption
