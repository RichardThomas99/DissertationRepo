import React, {Component} from 'react';
import * as firebase from 'firebase';

class DecayRate extends Component
{
  convertDatesToIndex(dateArray)
  {

    var dateIndex = Array(dateArray.length);
    var date1;
    var date2;
    var differenceInTime;
    var differenceInDays

    for(var i=0;i<dateArray.length;i++)
    {
        dateArray[i] = dateArray[i].replace(/_/g, "/");
        console.log(dateArray[i]);

        date1 = new Date(dateArray[i]);
        if(i==0)
        {
          date2 = new Date(dateArray[0]);
        }

        differenceInTime = date1.getTime() - date2.getTime();
        differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        dateIndex[i] = differenceInDays;
    }
    console.log("Date Index = "+ dateIndex)
    return dateIndex;
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
    console.log(xArray +"    -     " + yArray);

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

                  if(preambleKey == "averagePrice")
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

    console.log("xlength  = " + array[1]);
    console.log("ylength  = " + array[0]);

    var x = this.convertDatesToIndex(array[1]);
    var y = array[0];

    var decayRate = this.leastSquares(x,y);
    var lowerBound = 0.00;
    var upperBound = 250.00;

  return (
    <div>

    <h2>Decay-Rate: {decayRate} </h2>
    <p>The decay rate is a description of how quickly the average price of the trainer is changing over time.If the rate is between 0 and 1 the price is falling over time. If the rate is greater than 1 then the price is increasing.</p>
    <p>It calculates this rate through using all of the data points avaliable.</p>
    </div>
  );
 }
}

export default DecayRate;
