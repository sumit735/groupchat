import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../Contexts/AuthContext";
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [ loading, setLoading ] = useState(true);
    const handleLogout = async () => {
        auth.signOut();
        history.push('/');
    }

    // handle image
    const getFile = async (url) => {
        const res = await fetch(url);
        console.log(res);
        const data = await res.blob();
        return new File([data], "userPhoto.jpeg", {type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user) {
            history.push('/');
            return
        }

        axios.get("https://api.chatengine.io/users/me/", {
            headers: {
                "project-ID": process.env.REACT_APP_PROJECTID,
                "user-name": user.email,
                "user-secret": user.uid
            }
        }).then(() => {
            console.log('got existing user')
            setLoading(false);
        }).catch(() => {
            console.log('create new user')
            // handle user creation here
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            getFile(user.photoURL).then(avatar => {
                console.log('got the avatar');
                console.log(formdata.get('email'))
                formdata.append('avatar', avatar, avatar.name);
                axios.post("https://api.chatengine.io/users/", 
                    formdata, 
                    { headers: { "private-key": process.env.REACT_APP_PRIVATEKEY } }
                ).then(() => setLoading(false))
                .catch((err) => console.log('create faikled',err))
            });
        })
    }, [user, history]);
    
    if(!user || loading) return "Loading..."

    return (
        <div>
            <div className="chats-page">
                <div className="nav-bar">
                    <div className="logo-tab">
                        Group Chat
                    </div>
                    <div onClick={handleLogout} className="logout-tab">
                        Logout
                    </div>
                </div>
                <ChatEngine 
                    height = "calc(100vh - 66px)"
                    projectID = { process.env.REACT_APP_PROJECTID }
                    userName = { user.email }
                    userSecret = { user.uid }
                />
            </div>
        </div>
    )
}

export default Chats