import React, {Component} from 'react';
import Data from '../data/data.json';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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

    getDistributionNew(sizeArray,priceArray)
    {
      var count=0;
      var sizeArrayLength = sizeArray.length;

      //25 one for each half size.
      var quantityArray = Array(25);
      var averagesArray = Array(25);

      var z=25;
      var maxSize = 13;
      var minSize = 3;
      var minPrice = 15.00;
      var maxPrice = 160.00;

      var temp =0;
      var y=0;

      while(z--){
        quantityArray[z] = 0;
        averagesArray[z] = 0;
      }

      for(count=0;count<sizeArrayLength;count++)
      {
        if(sizeArray[count]>=minSize && sizeArray[count]<maxSize)
        {
            temp = (parseFloat(sizeArray[count])*2)-3;

            if((priceArray[count]<maxPrice) &&(priceArray[count]>=minPrice))
            {
              quantityArray[temp]++;
              averagesArray[temp] = averagesArray[temp] + priceArray[count];
            }
        }
      }

      for(y=0;y<25;y++)
      {
        averagesArray[y] = parseFloat(averagesArray[y])/parseFloat(quantityArray[y]);
        if(averagesArray[y] === "NaN"){
          averagesArray[y] = 0;
        }
        temp = (y+3)/2;

        console.log("average for size"+temp +": " + averagesArray[y]);
      }

      return [quantityArray,averagesArray];
    }
   //returned values:
    getDistribution(array)
    {
      //Defining variables for method
      var data = new Array(205);

      var maxSize = 13;
      var minSize = 3;

      //25 one for each half size.
      var quantityArray = Array(25);
      var averagesArray = Array(25);

      //Loop counter variables
      var i;
      var z;
      var y;

      var size;
      var price;
      var maxPriceTaken = 250.00;
      var temp;


      for ( i = 0; i < data.length; i++)
      {
        data[i] = new Array(3);
      }
      data=array;


      z=25;
      while(z--){
        quantityArray[z] = 0;
        averagesArray[z] = 0;
      }

      for(i=0;data[i+1] !=null;i++)
      {
        size = data[i][2];
        price = parseFloat(data[i][1]);

        if(size>=minSize && size<maxSize)
        {
            temp = (parseFloat(size)*2) -3;

            if(price<maxPriceTaken)
            {
              quantityArray[temp]++;
              averagesArray[temp] = averagesArray[temp] + price;
            }
        }
      }

      for(y=0;y<25;y++)
      {
        averagesArray[y] = parseFloat(averagesArray[y])/parseFloat(quantityArray[y]);
        if(averagesArray[y] === "NaN"){
          averagesArray[i] = 0;
        }
        temp = (y+3)/2;

        //console.log("average for size"+temp +": " + averagesArray[y]);
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

    if(re.exec(desc) != null){
      regexOut = re.exec(desc);
      //console.log("re: "+ regexOut[1]);
      return regexOut[1];
    }
    else if(re2.exec(desc) != null){
      regexOut = re2.exec(desc);
      //console.log("re2: "+ regexOut[1]);
      return regexOut[1];
    }
    else if (re3.exec(desc) != null){
      regexOut = re3.exec(desc);
      //console.log("re3: "+ regexOut[1]);
      return regexOut[1];
    }
    else{
      return -1;
    }
  }


  render()
  {
    console.log(this.props);
    var sizeArray = [];
    var priceArray = [];


      Data.map((content,index)=>
      {
        if(content.size.length>2){
          console.log("SIZE FOUND = " +content.size);
          sizeArray[index] =  parseFloat((content.size).substring(3));
        }
        else{
          console.log("NO SIZE = " + this.getSize(content.desc));
          sizeArray[index] = this.getSize(content.desc);
        }
        priceArray[index] = parseInt((content.price).substring(1));
      });

      var distribution = Array(2);
      distribution[0] = new Array(25);
      distribution[1] = new Array(25);

      distribution = this.getDistributionNew(sizeArray,priceArray);
     /*distribution = this.getDistribution(x);*/


    return (
    <div>
        <h3>Size Analysis</h3>

        <p>Settings behind this size analysis are listed below: </p>

        {this.graph(distribution[0],distribution[1])}


        <h3>Raw Size Data: </h3>
      {/*this.printSizeData(distribution[0],distribution[1])*/}

    </div>
  );
 }
}

export default SizeAnalysis;
