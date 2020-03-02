import React, {Component} from 'react';
import ScoreText from './components/ScoreText';
import SearchBar from './components/SearchBar';
import Data from './data/data.json'

class TopListings extends Component
{


render()
  {


      return(

        <div>

          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

          <h1>TopListings</h1>
          <ScoreText/>
          <SearchBar/>

          {Data.map((postDetail, index)=>{
            return<div>
            <h3>{postDetail.seller}</h3>
            <p>{postDetail.desc}</p>
            <p>{postDetail.price}</p>
            <p>{postDetail.size}</p>
            <p>{postDetail.location}</p>
            <p>{postDetail.listed}</p>
            </div>
          })}

        </div>
      );
  }

}

export default TopListings;
