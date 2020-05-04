import React, {Component} from 'react';
import Data from '../data/data.json';

/**
 * A ReactJS class which calculates the average price of the listings in the JSON.
 * @example
 * return (
 *   <div>
 *      <h3>Average Price: £{average}</h3>
 *     <p>Settings behind this average are listed below. </p>
 *       <ul id="content-list">
 *           <li>Original Array Used = Untampered</li>
 *           <li>Lower bounds = £{lowerBound}</li>
 *           <li>Upper bounds = £{upperBound}</li>
 *       </ul>
 *   </div>
 * )
 */
class AveragePrice extends Component
{
  calcAvePrice(maxPrice, minPrice)
  {
    var total =0;
    var price =0;
    var quantity = 0;

    Data.map(function(content,index)
    {

      price = parseInt((content.Price).substring(1));

      if((price<maxPrice) &&(price>=minPrice))
      {
        total = total + price;
        quantity++;
      }

    });
    var average = total/quantity;
    return average;
  }

  render()
  {
    var lowerBound = 15.00;
    var upperBound = 160.00;
    var average = this.calcAvePrice(upperBound,lowerBound);

  return (
    <div>

    <h3>Average Price: £{average}</h3>
    <p>Settings behind this average are listed below. </p>
      <ul id="content-list">
          <li>Original Array Used = Untampered</li>
          <li>Lower bounds = £{lowerBound}</li>
          <li>Upper bounds = £{upperBound}</li>
      </ul>
    </div>
  );
 }
}

export default AveragePrice;
