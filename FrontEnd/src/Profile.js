import {
    MailOutline,
    PhoneAndroid,
} from "@material-ui/icons";
import React from "react";
import "./Profile.css";

export default function Profile() {
    return (
        <div className ="profile">
            <div className ="profileTitleContainer"> 
                <h1 className = "profileTitle"> Profile </h1>
            </div>
            <div className ="profileContainer">
                <div className ="profileShow">
                    <div className = "profileTop">
                        <img src = "https://media.licdn.com/dms/image/D5603AQESw1FfqbEmcw/profile-displayphoto-shrink_200_200/0/1693894909694?e=2147483647&v=beta&t=Nv0g7I9gGKO-ZHWatlocxXl_mHqIFncfKKDklfM7KhA"
                        alt =""
                        className = "profileImage"
                        />
                        <div className = "profileTopTitle">
                            <span className ="profileName"> Will H. </span>
                            <span className ="profileTitle"> Sales Rep. </span>
                        </div>
                    </div>
                    <div className ="profileBottom">
                        <span className ="profileBottomTitle"> Account Details </span>
                        <div className ="profileInfo">
                            <PhoneAndroid className ="profileInfoIcons" />
                            <span className = "profileInfoContent"> (122) 333-4444 </span>
                        </div>
                        <div className ="profileInfo">
                            <MailOutline className ="profileInfoIcons" />
                            <span className = "profileInfoContent"> testing123@gmail.com </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}