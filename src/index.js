import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
   apiKey: "AIzaSyC2uEfM-ehZ7R59ncpug5ZZLl7vj4Goz1k",
   authDomain: "webscraper-ea963.firebaseapp.com",
   databaseURL: "https://webscraper-ea963.firebaseio.com",
   projectId: "webscraper-ea963",
   storageBucket: "webscraper-ea963.appspot.com",
   messagingSenderId: "363779589831",
   appId: "1:363779589831:web:118afb9558e84d35"
 };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
