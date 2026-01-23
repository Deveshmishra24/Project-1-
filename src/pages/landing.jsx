import React from "react";

function landing({onNavigate}) {
    return(
        <div style={{ padding: "20px"}}>
            <h1>Welcome to our Application</h1>
            <nav style={{ display:"flex",gap:"15px",marginBottom:"20px" }}>
             <button onClick={() => onNavigate("home")}>home</button>
                <button onClick={() => onNavigate("about")}>about</button>
                <button onClick={() => onNavigate("contact")}>contact</button>
                <button onClick={() => onNavigate("login")}>login</button> 
                <button onClick={() => onNavigate("register")}>Register</button>
                   
            </nav>
            <p>Welcome to the landing page of the Website</p>
        </div>
    )
}
export default landing;