import React, {Component} from 'react';
import {
AreaChart, Area, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Data from '../data/data.json';


/**
 * A ReactJS class which provides a graph component which shows how the
 * listed time is distributed for the listing.
 * @example
 * return (
 *   <div>
 *     <h3>ListingTimeDistributionGraph Method</h3>
 *
 *     {this.graph(distribution[0],bucketSize,maximumBucket,numOfBuckets)}
 *     <h5>Average Listed Time is ={distribution[1]} HOURS</h5>
 *     <p>Settings behind this listing time distribution are displayed below: </p>
 *
 *          <p>Original Array Used = Untampered</p>
 *         <p> Bucket Size = {bucketSize}</p>
 *         <p> Maximum Bucket = {maximumBucket}</p>
 *
 *   </div>
 * )
 */
class ListedTimeDistribution extends Component
{

  graph(bucket,bucketSize,maximumBucket,numOfBuckets)
  {
    var dataArray = Array(numOfBuckets);
    var bucketVal="";
    var name = "";
    for(var i=0;i<numOfBuckets;i++)
    {
      bucketVal = (i+1)*bucketSize;

      if(i==numOfBuckets-1)
      {
        name = bucketVal-bucketSize + "=<";
      }
      else {
        name = (bucketVal-bucketSize)+ "<" + bucketVal ;
      }
      dataArray[i] =
      {
        "name": name,
        "Quantity": bucket[i],
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
    var listedArray = [];
    var timeTerm="";
    var timeVal ="";
    var totalListed = 0;
    var quantity = 0;
    var bucket = Array(maximumBucket);
    var upperArray = Array(numOfBuckets);
    var i=0;
    while(i<numOfBuckets)
    {
      bucket[i] = 0;
      i++;
    }
    Data.map(function(content,index)
    {

      timeTerm = (content.Listed).split(" ")[2];
      timeVal = parseInt((content.Listed).split(" ")[1]);

      if(timeTerm === "MINUTES" || timeTerm === "MINUTE")
      {
        timeVal = timeVal/60;
      }
      if(timeTerm === "DAYS" || timeTerm === "DAY")
      {
        timeVal = timeVal*24;
      }
      if(timeTerm === "WEEKS" || timeTerm === "WEEK")
      {
        timeVal = timeVal*168;
      }
      if(timeTerm === "MONTHS" || timeTerm === "MONTH")
      {
        timeVal = timeVal*744;
      }

      console.log("Listed array = "+ timeVal + " HOURS");
      totalListed = totalListed + timeVal;
      quantity++;
      var count=0;

      var state = true;

      while(state && count<numOfBuckets)
      {
        if(timeVal<(count+1)*bucketSize || count==(numOfBuckets-1))
        {
          state=false;
          bucket[count]++;
        }
        count++;
      }
    });

    var averageListed = totalListed/quantity;
    console.log("averageListed = "+ averageListed + " HOURS");

    return [bucket,averageListed];
}

  render()
  {

    var bucketSize = 1;
    var maximumBucket = 13;
    var numOfBuckets= maximumBucket/bucketSize;
    var distribution = this.getDistribution(bucketSize,maximumBucket,numOfBuckets);

    return (
    <div>
        <h3>ListingTimeDistributionGraph Method</h3>

        {this.graph(distribution[0],bucketSize,maximumBucket,numOfBuckets)}
        <h5>Average Listed Time is ={distribution[1]} HOURS</h5>
        <p>Settings behind this listing time distribution are displayed below: </p>

            <p>Original Array Used = Untampered</p>
            <p> Bucket Size = {bucketSize}</p>
            <p> Maximum Bucket = {maximumBucket}</p>
    </div>
  );
 }
}

export default ListedTimeDistribution;
