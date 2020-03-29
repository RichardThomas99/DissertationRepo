import React, {Component} from 'react';
import * as firebase from 'firebase';

class DecayRate extends Component
{
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
      var total =0;
      var quantity=0;

      console.log("databaseRef: " + databaseRef);
      console.log("trainerRef: " + trainerRef);

      trainerRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){

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
                  if(preambleKey = "averageListed")
                  {
                    total = total + parseFloat(preambleData);
                  }

                });
              });
            }

          });
        });
      });

    return 0;
  }
  render()
  {
    /*this.calcDecayRate("NIKEAIRMAX97SILVERBULLETVAPOURMAX");*/

    var x = [8,2,11,6,5,4,12,9,6,1];
    var y = [3,10,3,6,8,12,1,4,9,14];
    var decayRate = this.leastSquares(x,y);
    var lowerBound = 0.00;
    var upperBound = 250.00;

    if(!this.props.loading)
    {
    }


  return (
    <div>

    <h2>Decay-Rate: {decayRate} </h2>
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
