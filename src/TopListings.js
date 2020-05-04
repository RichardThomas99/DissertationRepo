import React, {Component} from 'react';
import ScoreText from './components/ScoreText';
import SearchBar from './components/SearchBar';
import Data from './data/data.json';
import ScoreList from './components/ScoreList';
import Product from './components/productInJson'

/**
 * A ReactJS class which renders all the components relating to the top listings
 * analysis of the products from the scrape.
 * @example
 * return (
 *      <div>
 *        <h1>TopListings</h1>
 *        <ScoreText/>
 *        <SearchBar/>
 *
 *        <Product/>
 *        <ConvertCurrency/>
 *        <ScoreList/>
 *      </div>
 * )
 */
class TopListings extends Component
{
  sanitiseData()
  {
    var currency ="";
    var price=0.0;
    var priceText="";

    Data.map(function(content,index)
    {
      priceText = content.Price;

      currency = priceText.substring(0,1);
      price = parseFloat(priceText.substring(1));

      if(priceText.length>9)
      {
        price= parseFloat(priceText.split(currency)[2]);
      }
      if(currency == "$")
      {
        console.log(price+" , "+parseFloat(price*0.8));
        content.Price = "£"+parseFloat(price*0.8);
      }
      else if (currency =="€") {
        content.Price = "£"+parseFloat(price*0.88);
      }
      else {
        content.Price = currency+ price;
      }
    });
  }


render()
  {
    this.sanitiseData();
      return(

        <div>
          <h1>TopListings</h1>
          <SearchBar/>
          <Product/>
          <ScoreText/>

          <h2>*****************************************************************************************</h2>

          <ScoreList/>
        </div>
      );
  }

}

export default TopListings;
