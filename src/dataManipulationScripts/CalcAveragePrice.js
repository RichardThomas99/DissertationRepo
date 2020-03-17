import React, {Component} from 'react';
import Data from '../data/data.json';

class CalcAveragePrice extends Component
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
    var lowerBound = this.props.lowerBound;
    var upperBound = this.props.upperBound;
    var average = 0;
    average = this.calcAvePrice(upperBound,lowerBound);
    
  return (
    <h3>{average}</h3>

  );
 }
}

export default CalcAveragePrice;
