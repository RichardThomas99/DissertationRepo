import React, {Component} from 'react';
import ScoreText from './components/ScoreText';
import SearchBar from './components/SearchBar';
import Data from './data/data.json';
import ConvertCurrency from './dataManipulationScripts/convertCurrency.js';
import ScoreList from './components/ScoreList';
import Product from './components/productInJson'

class TopListings extends Component
{
sanitiseData()
{
  var currency ="";
  var price=0.0;
  var priceText="";

  Data.map(function(content,index)
  {
    priceText = content.price;

    currency = priceText.substring(0,1);
    price = parseFloat(priceText.substring(1));

    if(priceText.length>9)
    {
      price= parseFloat(priceText.split(currency)[2]);
    }
    if(currency == "$")
    {
      console.log(price+" , "+parseFloat(price*0.8));
      content.price = "£"+parseFloat(price*0.8);
    }
    else if (currency =="€") {
      content.price = "£"+parseFloat(price*0.88);
    }
    else {
      content.price = currency+ price;
    }
  });
}
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
    <p>{content.followers}</p>
    <p>{content.stars}</p>
    <p>{content.reviews}</p>
    <p>{content.url}</p>
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
    this.sanitiseData();
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
