import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth"
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const googleAuth = new GoogleAuthProvider();

    // New User
    const createNewUser = (email, pass) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    //logIn User
    const loginUser = (email, pass) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    //Google Sign in
    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleAuth)
    }

    // update profile 
    const updateUserName = (name) =>{
       return updateProfile(auth.currentUser, {
            displayName:name
          })
    }

    //logOut user
    const logOutUser = () =>{
        return signOut(auth)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })
        return () =>{
            unsubscribe()
        }
    },[])

    const contexDataWraper = {createNewUser, logOutUser, loginUser, googleSignIn, user,setUser, loading, updateUserName}
    return (
        <AuthContext.Provider value={contexDataWraper}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;