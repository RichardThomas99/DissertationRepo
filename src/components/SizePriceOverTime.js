import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class SizePriceOverTime extends Component
{
  graph(listedTimeArray,dateArray)
  {
    var arraySize = listedTimeArray.length;
    var dataArray = Array(arraySize);
      console.log("arrrayyyy  = "+arraySize);

    for(var i=0;i<arraySize;i++)
    {


      dataArray[i] =
      {
        Date:dateArray[i],
        sa0:listedTimeArray[i][0],
        sa1:listedTimeArray[i][1],
        sa2:listedTimeArray[i][2],
        sa3:listedTimeArray[i][3],
        sa4:listedTimeArray[i][4],
        sa5:listedTimeArray[i][5],
        sa6:listedTimeArray[i][6],
        sa7:listedTimeArray[i][7],
        sa8:listedTimeArray[i][8],
        sa9:listedTimeArray[i][9],
        sa10:listedTimeArray[i][10],
        sa11:listedTimeArray[i][11],
        sa12:listedTimeArray[i][12],
        sa13:listedTimeArray[i][13],
        sa14:listedTimeArray[i][14],
        sa15:listedTimeArray[i][15],
        sa16:listedTimeArray[i][16],
        sa17:listedTimeArray[i][17],
        sa18:listedTimeArray[i][18],
        sa19:listedTimeArray[i][19],
        sa20:listedTimeArray[i][20],
        sa21:listedTimeArray[i][21],
        sa22:listedTimeArray[i][22],
        sa23:listedTimeArray[i][23],
        sa24:listedTimeArray[i][24],
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

            <Bar yAxisId="left" dataKey="sa0" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa1" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa2" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa3" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa4" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa5" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa6" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa7" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa8" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa9" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa10" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa11" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa12" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa13" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa14" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa15" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa16" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa17" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa18" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa19" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa20" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa21" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa22" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa23" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="sa24" fill="#8884d8" />
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
      var listedTimeArray = Array(this.props.count);
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
                  if(preambleKey == "pricePerSize")
                  {
                    listedTimeArray[count] = preambleData;
                    console.log("pricePersize = " + preambleData);
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

    <h2>Size Price Average OverTime: </h2>
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

export default SizePriceOverTime;
