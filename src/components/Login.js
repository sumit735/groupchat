import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
// import "firebase/app";

import { auth } from "../firebase";
import firebase from "firebase/app";
const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome To Groupchat</h2>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Signin With Google
                </div>
                <br /><br />
                <div
                    className="login-button facebook"
                    onClick={() => auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Signin With Facebook
                </div>
            </div>
        </div>
    );
}

export default Login;