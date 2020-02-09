import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import{graphql} from 'react-apollo';
import DataSets from '../DataSets'
import {
AreaChart, Area, Brush, ReferenceLine, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class PriceDistributionGraph extends Component
{

  graph(array,bucketSize,maximumBucket,numOfBuckets)
  {
    // console.log("array[0]" + array[0][0]);
    // console.log("array[1]" + array[1][0]);
    var dataArray = Array(numOfBuckets);

    for(var i=0;i<numOfBuckets;i++)
    {
      dataArray[i] =
      {
        "name": (array[i][0]-bucketSize)+ "<" + array[i][0] ,
        "Quantity": array[i][1],
        "amt": 2400
      }
    }


    const renderBarChart = (

      <AreaChart width={950} height={250} data={dataArray}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
        <Area type="monotone" dataKey="Quantity" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );

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
    var priceArray = this.props.array;
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
    console.log(this.props);

    var bucketSize = 10;
    var maximumBucket = 200;
    var numOfBuckets= maximumBucket/bucketSize;
    var distribution = this.getDistribution(bucketSize,maximumBucket,numOfBuckets);

    return (
    <div>
        <h3>PriceDistributionGraph Method</h3>

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
