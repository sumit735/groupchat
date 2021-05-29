import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyADWCh1xTdAapDqNC3kAmg2HL-kpZqfKf0",
    authDomain: "group-chat-ef39b.firebaseapp.com",
    projectId: "group-chat-ef39b",
    storageBucket: "group-chat-ef39b.appspot.com",
    messagingSenderId: "568633755001",
    appId: "1:568633755001:web:13ba85a12718a40af15ba8"
}).auth();