import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import * as firebase from 'firebase';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//components
import Settings from './Settings'
import TopListings from './TopListings'
import RealTimeAnalysis from './RealTimeAnalysis'
import OverTimeAnalysis from './OverTimeAnalysis'
import Nav from './components/Nav'
import MainNav from './components/MainNav'


//Apollo client site
const client = new ApolloClient({
  uri: 'https://graphql.depop.com/'
})


/**
 * The main class for the project which defines the react router pathways for
 * the software.
 */
class App extends Component
{

render()
{
  return (

    <ApolloProvider client={client}>
      <Router>
      <div id="main">

        <Nav/>
        <MainNav/>
        <Route path = "/Settings" component ={Settings}/>
        <Route path = "/RealTimeAnalysis" component ={RealTimeAnalysis}/>
        <Route path = "/TopListings" component ={TopListings}/>
        <Route path = "/OverTimeAnalysis" component ={OverTimeAnalysis}/>

      </div>
      </Router>
    </ApolloProvider>
  );
 }
}
export default App;
