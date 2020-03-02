import React, {Component} from 'react';
import'../App.css';
import UploadScrape from '../uploadScrape.js'

class SearchBar extends Component
{
  state = {
    visible: false
  };

  httpGet()
  {
    try
    {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", "http://localhost:5000/", false ); // false for synchronous request
      xmlHttp.send( null );
    }
    catch(exception)
    {
        console.log('There was an ERROR CAUGHT running the httpGet request of the python server! The exception was: '+ exception);
        console.log('Check the file locations referenced in flaskFile.py and ensure the flask server is on!')
    }
  }

  submit()
  {

    var searchTerm = document.getElementById("textSearch").value;
    console.log("Search Term: " + searchTerm);

    this.httpGet();
  }


render()
{
  const upload = this.state.visible ? (
    <UploadScrape/>
  ):(<div></div>);

  return(
    <div class = "searchDiv">
      <form>
        <label>
          <input id = "textSearch"  type="text" name="product" placeholder ="Search a Product..." />
        </label>
          <button onClick = {(e) => {e.preventDefault(); this.submit();}}> Submit Search </button>
          <button onClick = {() => {this.setState({visible: !this.state.visible});}}> Store Data </button>
        </form>

        {upload}
      </div>
    );
}
}

export default SearchBar;
