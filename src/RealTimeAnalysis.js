import React, {Component} from 'react';
import SearchBar from './components/SearchBar'

//components
import PriceDistributionGraph from './components/PriceDistributionGraph';
import AveragePrice from './components/AveragePrice';
import SizeAnalysis from './components/SizeAnalysis';
import Data from './data/data.json';
import Product from './components/productInJson'
import ListedTimeDistribution from './components/ListedTimeDistribution.js'


/**
 * A ReactJS class which renders all the components relating to the real-time
 * analysis of the product listing
 * @example
 * return (
 *         <h1>RealTimeAnalysis</h1>
 *         <SearchBar/>
 *         <Product/>
 *         <AveragePrice/>
 *         <h2>*****************************************************************************************</h2>
 *         <PriceDistributionGraph/>
 *         <h2>*****************************************************************************************</h2>
 *         <SizeAnalysis/>
 *         <h2>*****************************************************************************************</h2>
 *         <ListedTimeDistribution/>
 * )
 */
class RealTimeAnalysis extends Component
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
          <h1>RealTimeAnalysis</h1>
          <SearchBar/>
          <Product/>
          <h2>*****************************************************************************************</h2>

          <AveragePrice/>

          <h2>*****************************************************************************************</h2>

          <PriceDistributionGraph/>

          <h2>*****************************************************************************************</h2>

          <SizeAnalysis/>

          <h2>*****************************************************************************************</h2>

          <ListedTimeDistribution/>

        </div>
      );
  }

}

export default RealTimeAnalysis;
