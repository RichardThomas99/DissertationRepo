import React, {Component} from 'react';
import ScoreText from './components/ScoreText';
import SearchBar from './components/SearchBar';
import $ from 'jquery';

class TopListings extends Component
{

runAjax()
{

  console.log("IN RUN AJAX");

  var jqXHR = $.ajax({
      type: "GET",
      url: "http://localhost:5000/osStuff",
      async: false,
      data: { mydata: null}
  });



  console.log("PAST RUN AJAX");

}

httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://localhost:5000/", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


render()
  {


      return(

        <div>

          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

          <h1>TopListings</h1>
          <ScoreText/>
          <SearchBar/>

          {this.httpGet()}

        </div>
      );
  }

}

export default TopListings;
