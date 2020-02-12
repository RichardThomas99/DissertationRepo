import React, {Component} from 'react';

class AveragePrice extends Component
{
  //Gets average price of an array of floats. also takes input of maximum price and minimum prices.
    getAveragePrice(priceArray,maxPriceTaken)
    {
          var fullCount = 0;
          var acceptedCount =0;
          var total = 0;
          var temp = 0;

          while(priceArray[fullCount+1]!=null)
          {
            temp = parseFloat(priceArray[fullCount]);

            if(temp<maxPriceTaken)
            {
              total = total + temp;
              acceptedCount++;
            }

            fullCount++;
          }

          //Debugging logs
          // console.log(fullCount)
          // console.log(acceptedCount);
          // console.log(total);

          var average = total/acceptedCount;
          return (average);
    }

  render()
  {
    var lowerBound = 0.00;
    var upperBound = 250.00;
    var average = 0;

    if(!this.props.loading)
    {
       average  = this.getAveragePrice(this.props.content,upperBound);
    }


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
