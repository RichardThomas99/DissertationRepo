import React, {Component} from 'react';
import * as firebase from 'firebase';

class DecayRate extends Component
{
  convertDatesToIndex(dateArray)
  {
    for(var i=0;i<dateArray.length;i++)
    {
        var differenceInTime = dateArray[0].getTime() - dateArray[0].getTime();
        var differenceInDays = differenceInTime / (1000 * 3600 * 24);
        console.log("date = "+differenceInDays);
    }


  }
  averageOfArray(array)
  {
    var total=0;
    var i=0;

    for(i=0; i<array.length;i++)
    {
      total = total + array[i];
    }
    return(total/i);
  }

  leastSquares(xArray,yArray)
  {
    var xAverage = this.averageOfArray(xArray);
    var yAverage = this.averageOfArray(yArray);
    var xInter;
    var yInter;
    var sum1 =0;
    var sum2=0;

    for(var i=0; i<xArray.length;i++)
    {
      xInter = xArray[i]-xAverage;
      yInter =yArray[i]-yAverage;
      sum1 = sum1 + (xInter*yInter);
      sum2 = sum2 + (xInter*xInter);

    }
    return (sum1/sum2);
  }
  calcDecayRate(item)
  {
      var snapshot;
      const databaseRef = firebase.database().ref("/");
      const trainerRef = databaseRef.child(item);
      var total = 0;
      var quantity = 0;
      var date;
      var count = 0;
      var priceArray = Array(this.props.count);
      var dateArray = Array(this.props.count);

      console.log("databaseRef: " + databaseRef);
      console.log("trainerRef: " + trainerRef);

      trainerRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){

          dateArray[count] = childSnapshot.key;
          //Date
          console.log("date = " + date);

          childSnapshot.forEach(function(childChildSnapshot){
            var childChildKey = childChildSnapshot.key;

            //Data/Preamble
            if(childChildKey == "Preamble")
            {
              childChildSnapshot.forEach(function(childChildChildSnapshot){
                var childChildChildKey = childChildChildSnapshot.key;

                childChildChildSnapshot.forEach(function(childChildChildChildSnapshot){
                  var preambleKey = childChildChildChildSnapshot.key;
                  var preambleData = childChildChildChildSnapshot.val();

                  //Actual Data
                  console.log(preambleKey +" = "+ preambleData);

                  if(preambleKey = "averagePrice")
                  {
                    priceArray[count] = preambleData;
                    count++;
                  }
                });
              });
            }
          });
        });
      });

    return [priceArray,dateArray];
  }

  render()
  {
    var array = this.calcDecayRate("NIKEAIRMAX97SILVERBULLETVAPOURMAX");
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var dater = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+(today.getDate());
    var date1 = new Date(date);
    var date2 = new Date(dater);
    console.log(date2.getTime() + " == array length");

    var differenceInTime = date2.getTime() - date1.getTime();
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log("date = "+differenceInDays);
    /*this.convertDatesToIndex(array[1]);*/

    var x = array[1];
    var y = array[0];
    /*var decayRate = this.leastSquares(x,y);*/
    var lowerBound = 0.00;
    var upperBound = 250.00;

    if(!this.props.loading)
    {
    }


  return (
    <div>

    <h2>Decay-Rate:  </h2>
    <p>The decay rate is a description of how quickly the average price of the trainer is changing over time.If the rate is between 0 and 1 the price is falling over time. If the rate is greater than 1 then the price is increasing.</p>
    <p>Settings behind the decay-rate are listed below. </p>
      <ul id="content-list">
          <li>Original Array Used = Untampered</li>
          <li>Lower bounds = £{lowerBound}</li>
          <li>Upper bounds = £{upperBound}</li>
      </ul>
    </div>
  );
 }
}

export default DecayRate;
