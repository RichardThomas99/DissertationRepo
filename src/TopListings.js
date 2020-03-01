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
      type: "POST",
      url: " http://localhost:80/cmdTest.py",
      async: false,
      data: { mydata: "" }
  });

  console.log("PAST RUN AJAX");

}


render()
  {


      return(

        <div>

          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

          <h1>TopListings</h1>
          <ScoreText/>
          <SearchBar/>

          {this.runAjax()}

        </div>
      );
  }

}

export default TopListings;
