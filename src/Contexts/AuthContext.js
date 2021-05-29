import React, { useState, createContext, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import {auth} from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState(null);

    const history = useHistory();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if(user) history.push('/chats');
            
        })
    }, [user, history]);

    const userDetails = { user };

    return(
        <AuthContext.Provider value={userDetails}>
            {!loading && children}
        </AuthContext.Provider>
    )
}