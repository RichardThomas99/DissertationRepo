import React, {Component} from 'react';
import Data from '../data/data.json';

class PreambleData extends Component
{

  calcAvePrice(maxPrice, minPrice)
  {
    var total =0;
    var price =0;
    var quantity = 0;

    Data.map(function(content,index)
    {
      if((content.price).length>7)
      {

      }

      price = parseInt((content.price).substring(1));

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
    var average = 0;
    average = this.calcAvePrice(upperBound,lowerBound);


  return (

      average

  );
 }
}

export default PreambleData;
