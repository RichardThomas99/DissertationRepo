import React, {Component} from 'react';
import ScoreText from './components/ScoreText';
import SearchBar from './components/SearchBar';
import Data from './data/data.json';
import ConvertCurrency from './dataManipulationScripts/convertCurrency.js';
import ScoreList from './components/ScoreList';
import Product from './components/productInJson'
class TopListings extends Component
{

printAllData()
{
  return Data.map((content, index)=>{
    return<div>
    <h1>{index}</h1>
    <h3>{content.seller}</h3>
    <p>{content.desc}</p>
    <p>{content.price}</p>
    <p>{content.size}</p>
    <p>{((content.location).split(','))[1]}</p>
    <p>{content.listed}</p>
    </div>
  })
}
calcAvePrice()
{
  var total =0;
  var price =0;
  var quantity = 0;

  Data.map(function(content,index)
  {
    price = parseInt((content.price).substring(1));
    total = total + price;
    quantity = index+1;
  });

  console.log("index - "+ quantity);
  console.log("average price - "+ (total/quantity))
  return "Total Market Value is : £" + total;
}

render()
  {

      return(

        <div>
          <h1>TopListings</h1>
          <ScoreText/>
          <SearchBar/>
          <Product/>
          <ConvertCurrency/>
          <ScoreList/>
        </div>
      );
  }

}

export default TopListings;
