import React from 'react';
import ReactDOM from 'react-dom';
import TopListings from '../TopListings';
import renderer from 'react-test-renderer'
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
firebase.initializeApp(firebaseConfig);

it("TopListings Render",() => {
  const topListingsComponent = renderer.create(
    <TopListings/>
  ).toJSON();
  expect(topListingsComponent).toMatchSnapshot();
});
