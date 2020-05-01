import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class AveragePriceOverTime extends Component
{
  graph(averagePriceArray,dateArray)
  {

    var dataArray = Array(25);

    for(var i=0;i<25;i++)
    {
      dataArray[i] =
      {
        Date:dateArray[i],
        AveragePriceArray:averagePriceArray[i],
      }
    }


    const renderScatterChart = (
      <ScatterChart
            width={1500}
            height={350}
            data={dataArray}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis/>
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <Scatter dataKey="AveragePriceArray" fill='#8884d8' line lineJointType='fitting'/>

          </ScatterChart>

    );

      return renderScatterChart;

  }

  averagePriceArray(item)
  {
      var snapshot;
      const databaseRef = firebase.database().ref("/");
      const trainerRef = databaseRef.child(item);
      var total =0;
      var quantity=0;
      var count =0;
      var averagePriceArray = Array(this.props.count);
      var dateArray = Array(this.props.count);
      var date = "";
      /*console.log("databaseRef: " + databaseRef);
      console.log("trainerRef: " + trainerRef);*/

      trainerRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          date = childSnapshot.key;
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
                  if(preambleKey == "averagePrice")
                  {
                    averagePriceArray[count] = parseFloat(preambleData);
                    dateArray[count] = date;
                    count++;
                  }

                });
              });
            }

          });
        });
      });

    return [averagePriceArray,dateArray];
  }
  render()
  {
    var averagePriceArray="";

    averagePriceArray = this.averagePriceArray(this.props.product);

    var lowerBound = 0.00;
    var upperBound = 250.00;

    if(!this.props.loading)
    {
    }


  return (
    <div>

    <h2>Average Price Over-Time: </h2>
    <p>The Average Price Over-Time component displays a scatter graph plotting the average price of the product over time.</p>
    <p>Settings behind this component are listed below. </p>
    {averagePriceArray}
    {this.graph(averagePriceArray[0],averagePriceArray[1])}
      <ul id="content-list">
          <li>Original Array Used = Untampered</li>
          <li>Lower bounds = £{lowerBound}</li>
          <li>Upper bounds = £{upperBound}</li>
      </ul>
    </div>
  );
 }
}

export default AveragePriceOverTime;
