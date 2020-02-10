import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import{graphql} from 'react-apollo';
import DataSets from '../DataSets'

import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class SizeAnalysis extends Component
{

  printSizeData(quantity, average)
  {
    return quantity.map(average=>{
      return(
        <p>{"£"+quantity + average}</p>
      )
    })
 
  }

  graph(quantityArray,averagesArray)
  {

    var dataArray = Array(25);
    var t=0;

    for(var i=0;i<25;i++)
    {
      dataArray[i] =
      {
        name:(i+3) /2,
        Quantity:quantityArray[i],
        Average : averagesArray[i],
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
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />

            <Bar yAxisId="left" dataKey="Quantity" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="Average" fill="#82ca9d" />
          </BarChart>
    );

      return renderBarChart;

  }

  // //returned values:
    getDistribution(array)
    {
      var data = new Array(205);
      for (var i = 0; i < data.length; i++)
      {
        data[i] = new Array(3);
      }
      data=array;


      var maxSize = 13;
      var minSize = 3;

      var quantityArray = Array(25);
      var averagesArray = Array(25);

      var z=25;
      while(z--) quantityArray[z] = 0;
      z=25;
      while(z--) averagesArray[z] = 0;

      var size;
      var price;
      var total;
      var maxPriceTaken = 250.00;

      for(var i=0;data[i+1] !=null;i++)
      {
        size = data[i][2];
        price = parseFloat(data[i][1]);

        if(size>=minSize && size<maxSize)
        {
            var temp = (parseFloat(size)*2) -3;

            if(price<maxPriceTaken)
            {
              quantityArray[temp]++;
              averagesArray[temp] = averagesArray[temp] + price;
            }
        }
      }

      for(var y=0;y<25;y++)
      {
        averagesArray[y] = parseFloat(averagesArray[y])/parseFloat(quantityArray[y]);
        if(averagesArray[y] == "NaN")
        {
          averagesArray[i] = 0;
        }
        var temp = (y+3)/2;

        console.log("average for size"+temp +": " + averagesArray[y]);
      }

    return [quantityArray,averagesArray];
  }


//Applies regex to return size or -1 if unable to attain size.
  getSize(desc)
  {
    var regexOut;
    //Size __ 3.
    const re = /size.(\d\d?(?:\.5)?)/i;
    //UK 3.
    const re2 = /uk.?(\d\d?(?:\.5)?)/i;
    //Size 4.
    const re3 = /size.\w*\W*.?(\d\d?(?:\.5)?)/i;

    if(re.exec(desc) != null)
    {
      regexOut = re.exec(desc);
      console.log("re: "+ regexOut[1]);
      return regexOut[1];
    }
    else if(re2.exec(desc) != null)
    {
      regexOut = re2.exec(desc);
      console.log("re2: "+ regexOut[1]);
      return regexOut[1];
    }
    else if (re3.exec(desc) != null)
    {
      regexOut = re3.exec(desc);
      console.log("re3: "+ regexOut[1]);
      return regexOut[1];
    }
    else
    {
      console.log("SIZE NOT FOUND");
      return -1;
    }

  }

  render()
  {
    console.log(this.props);

    var x = new Array(205);
    for (var i = 0; i < x.length; i++)
    {
      x[i] = new Array(3);
    }

    var distribution = Array(2);
    for (var i = 0; i < distribution.length; i++)
    {
      distribution[i] = new Array(25);
    }

    if(!this.props.loading)
    {
      x = this.props.array;
      var i = 0;

     while(x[i+1]!=null)
     {
       x[i][2] = this.getSize(x[i][0]);
       i++;
     }

     distribution = this.getDistribution(x);
    }

    return (
    <div>
        <h3>Size Analysis</h3>

        <p>Settings behind this size analysis are listed below: </p>

        {this.graph(distribution[0],distribution[1])}


        <h3>Raw Size Data: </h3>
      //{this.printSizeData(distribution[0],distribution[1])}

    </div>
  );
 }
}

export default SizeAnalysis;
