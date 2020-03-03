import React, {Component} from 'react';
import Data from '../data/data.json'

class convertCurrency extends Component
{

updateJSON()
{
  var value = "";
  var currency = "";
  var value = "";

  var newPrice="";

  const US2UK = 0.78;
  const EU2UK = 0.87;

  Data.map(function(content,index)
  {
    if(content.price.substring(0,1)!="£")
    {
      currency = content.price.substring(0,1);
      value = content.price.substring(1);

      switch(currency){
        case "$":
          value = parseFloat(value)*US2UK;
          newPrice = "£" + value;
          console.log("val = "+ newPrice);
            console.log("content.price = " + content.price )
          content.price = newPrice;
          console.log("content.price = " + content.price )
          break;
      }
    }
  });

}

render()
{
  this.updateJSON()
  return(
  <p>Updated Currency Success</p>

    );
  }
}

export default convertCurrency;
