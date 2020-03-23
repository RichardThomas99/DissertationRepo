import React, {Component} from 'react';
import Data from '../data/data.json';
import UploadPreamble from './uploadPreamble.js';

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
    var product = this.props.product;
    var dataName = "AveragePrice";
    var average = 0;
    console.log("IN CALV AVERAGE PRICE*******1");
    average = this.calcAvePrice(upperBound,lowerBound);

    console.log("IN CALV AVERAGE PRICE*******");

    if(this.props.saveData == true)
    {

      console.log("IN CALC AVERAGE PRICE SAVE DATA*******");
      return(<UploadPreamble product = {product} dataName = {dataName} data = {average}/>);
    }

  return (
    <h3>{average}</h3>
  );
 }
}

export default CalcAveragePrice;
