import React, {Component} from 'react';
import {
AreaChart, Area, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Data from '../data/data.json';
class PriceDistributionGraph extends Component
{

  //Component For producing graph component.
  graph(array,bucketSize,maximumBucket,numOfBuckets)
  {
    var dataArray = Array(numOfBuckets);

    /*Setting the dataArray to contain the data of the graph*/
    for(var i=0;i<numOfBuckets;i++)
    {
      dataArray[i] =
      {
        /*The array[i][0] contains a price of the top end of a bucket*/
        "Price Bracket": (array[i][0]-bucketSize)+ "<" + array[i][0] ,
        /*Contains the quantity of listings at that price*/
        "Quantity": array[i][1]
      }
    }

    /*Creating a ReCharts graph variable to plot the dataArray data*/
    const renderBarChart = (

      <AreaChart width={950} height={250} data={dataArray}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Price Bracket" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="Price Bracket" height={30} stroke="#8884d8" />
        <Area type="monotone" dataKey="Quantity" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );

    /*Exporting the graph*/
    return renderBarChart;
  }

  printDistribution(c, bucketSize)
  {
    //not the most efficient way of printing the arrays
    return c.map(c=>{
      return(
        <p>{"£"+(c[0]-bucketSize) + "-£" +(c[0])+ " - "+ c[1]}</p>
      )
    })
  }

//returned values: c[0] = upperBucketSize, c[1] = count
  getDistribution(bucketSize,maximumBucket,numOfBuckets)
  {
    var priceArray = [];
    Data.map(function(content,index)
    {

      priceArray[index] = parseInt((content.price).substring(1));
    });

    var upperBucket;
    var bucket = Array(numOfBuckets);
    var upperArray = Array(numOfBuckets);
    var temp;
    var y=0;

    for(var i=1; i <= numOfBuckets;i++)
    {
      upperBucket =i*bucketSize;
      upperArray[i-1] = upperBucket;

      bucket[i-1]=0;
      y=0;

      while(priceArray[y+1]!=null)
      {
        //temp price float variable.
        temp = parseFloat(priceArray[y]);

        //Seeing if fits in bucket
        if((temp < upperBucket)&&(temp>=(upperBucket-bucketSize)))
        {
          //Increasing bucket counter if so
          bucket[i-1]++;
        }
        y++;
      }
    }

  //VERY USEFUL ALGORITHM FOR PAIRING ARRAYS TOGETHER.
  var distribution = upperArray.map(function(e, i)
  {
    return [e, bucket[i]];
  });

  return distribution;
}

  render()
  {

    var bucketSize = 10;
    var maximumBucket = 200;
    var numOfBuckets= maximumBucket/bucketSize;
    var distribution = this.getDistribution(bucketSize,maximumBucket,numOfBuckets);

    return (
    <div>
        <h3>Price Distribution Graph Element</h3>

        {this.graph(distribution,bucketSize,maximumBucket,numOfBuckets)}

        <p>Settings behind this price distribution are listed below: </p>

            <p>Original Array Used = Untampered</p>
            <p> Bucket Size = {bucketSize}</p>
            <p> Maximum Bucket = {maximumBucket}</p>



        <h3>Raw Distribution Data: </h3>
        {this.printDistribution(distribution,bucketSize,numOfBuckets)}

    </div>
  );
 }
}

export default PriceDistributionGraph;
