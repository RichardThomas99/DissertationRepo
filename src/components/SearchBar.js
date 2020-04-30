import React, {Component} from 'react';
import'../App.css';
import UploadScrape from '../dataManipulationScripts/uploadScrape.js'
import Product from './productInJson'

class SearchBar extends Component
{

  httpGet(url)
  {
    try
    {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", "http://localhost:5000/?url="+url, false ); // false for synchronous request
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

    var url = searchTerm = 'https://www.depop.com/search/?q='+searchTerm;
    this.httpGet(url);
  }


render()
{

  return(
    <div class = "searchDiv">
      <form>
        <label>
          <input id = "textSearch"  type="text" name="product" placeholder ="Search a Product..." />
        </label>
          <button onClick = {(e) => {e.preventDefault(); this.submit();}}> Submit Search </button>
        </form>

      </div>
    );
}
}

export default SearchBar;
