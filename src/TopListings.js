import React, {Component} from 'react';
import ScoreText from './components/ScoreText';
import SearchBar from './components/SearchBar';
import Data from './data/data.json'

class TopListings extends Component
{
printAllData()
{
  return Data.map((postDetail, index)=>{
    return<div>
    <h1>{index}</h1>
    <h3>{postDetail.seller}</h3>
    <p>{postDetail.desc}</p>
    <p>{postDetail.price}</p>
    <p>{postDetail.size}</p>
    <p>{postDetail.location}</p>
    <p>{postDetail.listed}</p>
    </div>
  })
}
calcAvePrice()
{
  var total =0;

  Data.map(function(postDetail)
  {
    total = total + parseInt((postDetail.price).substring(1))
  });
  return "Total Market Value is : £" + total;
}

render()
  {

      return(

        <div>
          <h1>TopListings</h1>
          <ScoreText/>
          <SearchBar/>
          {this.calcAvePrice()}
        </div>
      );
  }

}

export default TopListings;
