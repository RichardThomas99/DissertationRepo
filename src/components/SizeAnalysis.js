import React, {Component} from 'react';
import Data from '../data/data.json';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class SizeAnalysis extends Component
{

  printSizeData(quantityArray, averagesArray)
  {

    //VERY USEFUL ALGORITHM FOR PAIRING ARRAYS TOGETHER.
    return averagesArray.map(function(e, i)
    {
      return(
        <p>{"Size["+((i+3)/2)+"] - Av Price = £"+averagesArray[i] + " - Quantity on Sale = " + quantityArray[i]}</p>
      )

    });

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

    getDistribution(sizeArray,priceArray)
    {
      //25 one for each half size.
      var quantityArray = Array(25);
      var averagesArray = Array(25);

      var sizeArrayLength = sizeArray.length;

      var maxSize = 13;
      var minSize = 3;
      var minPrice = 15.00;
      var maxPrice = 160.00;

      var count =0;
      var temp =0;
      var z=25;
      var y=0;


      for(count=0;count<sizeArrayLength;count++)
      {
        if(sizeArray[count]>=minSize && sizeArray[count]<maxSize)
        {
            temp = (parseFloat(sizeArray[count])*2)-3;

            if((priceArray[count]<maxPrice) &&(priceArray[count]>=minPrice))
            {
              if(isNaN(quantityArray[temp])){
                quantityArray[temp]=0;
                averagesArray[temp]=0;
              }

              quantityArray[temp]++;
              averagesArray[temp] = averagesArray[temp] + priceArray[count];
            }
        }
      }

      for(y=0;y<25;y++)
      {
        averagesArray[y] = parseFloat(averagesArray[y])/parseFloat(quantityArray[y]);
        if(isNaN(averagesArray[y])){
          averagesArray[y] = 0;
        }
        if(isNaN(quantityArray[y])){
          quantityArray[y] = 0;
        }
        /*temp = (y+3)/2;
        console.log("average for size"+temp +": " + averagesArray[y]);*/
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
    var sizeArray = [];
    var priceArray = [];


      Data.map((content,index)=>
      {
        if(content.size.length>2){
          /*console.log("SIZE FOUND = " +content.size);*/
          sizeArray[index] =  parseFloat((content.size).substring(3));
        }
        else{
          /*console.log("NO SIZE = " + this.getSize(content.desc));*/
          sizeArray[index] = this.getSize(content.desc);
        }
        priceArray[index] = parseInt((content.price).substring(1));
      });

      var distribution = Array(2);
      distribution[0] = new Array(25);
      distribution[1] = new Array(25);

      distribution = this.getDistribution(sizeArray,priceArray);


    return (
    <div>
        <h3>Size Analysis</h3>

        <p>Settings behind this size analysis are listed below: </p>

        {this.graph(distribution[0],distribution[1])}


        <h3>Raw Size Data: </h3>
        {this.printSizeData(distribution[0],distribution[1])}

    </div>
  );
 }
}

export default SizeAnalysis;
