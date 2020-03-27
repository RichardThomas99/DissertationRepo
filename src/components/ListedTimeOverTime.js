import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class ListedTimeOverTime extends Component
{
  graph(listedTimeArray,dateArray)
  {

    var dataArray = Array(25);

    for(var i=0;i<25;i++)
    {
      dataArray[i] =
      {
        Date:dateArray[i],
        ListedAverage:listedTimeArray[i],
      }
    }


    const renderBarChart = (

      <BarChart
            width={1500}
            height={350}
            data={dataArray}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />

            <Bar yAxisId="left" dataKey="ListedAverage" fill="#8884d8" />
          </BarChart>
    );

      return renderBarChart;

  }

  listedTimeArray(item)
  {
      var snapshot;
      const databaseRef = firebase.database().ref("/");
      const trainerRef = databaseRef.child(item);
      var total =0;
      var quantity=0;
      var count =0;
      var listedTimeArray = Array(12);
      var dateArray = Array(12);
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
                  if(preambleKey == "averageListed")
                  {
                    listedTimeArray[count] = parseFloat(preambleData);
                    dateArray[count] = date;
                    count++;
                  }

                });
              });
            }

          });
        });
      });
      console.log("date Array = " + dateArray);
      console.log("Listed Array = " + listedTimeArray );
    return [listedTimeArray,dateArray];
  }
  render()
  {
    var listedTimeArray="";
    console.log("in listedTime !!!!!!!!!!!!!!!!!!  = " + this.props.product);

    listedTimeArray = this.listedTimeArray(this.props.product);

    var lowerBound = 0.00;
    var upperBound = 250.00;

    if(!this.props.loading)
    {
    }


  return (
    <div>

    <h2>ListedTime Average OverTime: </h2>
    <p>The decay rate is a description of how quickly the average price of the trainer is changing over time.If the rate is between 0 and 1 the price is falling over time. If the rate is greater than 1 then the price is increasing.</p>
    <p>Settings behind the decay-rate are listed below. </p>
    {listedTimeArray}
    {this.graph(listedTimeArray[0],listedTimeArray[1])}
      <ul id="content-list">
          <li>Original Array Used = Untampered</li>
          <li>Lower bounds = £{lowerBound}</li>
          <li>Upper bounds = £{upperBound}</li>
      </ul>
    </div>
  );
 }
}

export default ListedTimeOverTime;
