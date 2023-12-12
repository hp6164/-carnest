import React from "react";
import "./Profile.css";

export default function Profile() {
    return (
        <div className ="profileContainer"> 
            <div className ="profileShow">
                <div className = "profileTop">
                    <span className ="profileShowName"> Will H. </span>
                    <span className ="profileShowTitle"> Sales Rep. </span>
                </div>
                <div className ="profileBottom">
                    <span className ="profileContentTitle"> Email </span>
                    <span className ="profileInfo"> testing123@gmail.com </span>
                </div>
            </div>
        </div>
    );
}