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

    useEffect(() => {
        if(!user) {
            history.push('/');
            return
        }
        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-ID": process.env.PROJECT_ID,
                "User-Name": user.email,
                "User-Secret": user.uid
            }
        }).then(() => {
            setLoading(false);
        }).catch(() => {
            // handle user creation here
        })
    }, [user, history]);

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
                    projectId = { process.env.PROJECT_ID }
                    userName = { user.email }
                    userSecret = { user.uid }
                />
            </div>
        </div>
    )
}

export default Chats