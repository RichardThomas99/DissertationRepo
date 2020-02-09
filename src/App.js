import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import firebase from 'firebase';
import{firebaseConfig} from './Config';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//components
import Settings from './Settings'
import TopListings from './TopListings'
import DataSets from './DataSets'
import OverTimeAnalysis from './OverTimeAnalysis'

import Nav from './components/Nav'
import MainNav from './components/MainNav'


//Apollo client site
const client = new ApolloClient({
  uri: 'https://graphql.depop.com/'
})

class App extends Component
{
  /* NEED TO MOVE MAINNAV THIS TO JUST THE PAGES WHICH USE THIS NAV BAR. OTHERWISE IT WILL APPEAR ON THE SETTINGS ASWELL.*/

render()
{
  return (

    <ApolloProvider client={client}>
      <Router>
      <div id="main">

        <Nav/>
        <MainNav/>


        <Route path = "/Settings" component ={Settings}/>
        <Route path = "/DataSets" component ={DataSets}/>
        <Route path = "/TopListings" component ={TopListings}/>
        <Route path = "/OverTimeAnalysis" component ={OverTimeAnalysis}/>

      </div>
      </Router>
    </ApolloProvider>
  );
 }
}
export default App;
