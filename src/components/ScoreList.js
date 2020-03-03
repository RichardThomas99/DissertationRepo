import React, {Component} from 'react';
import Data from '../data/data.json';
import ConvertCurrency from '../dataManipulationScripts/convertCurrency.js';

class TopListings extends Component
{
calcScore()
{
  var score = 100;
  var homeLocation = ["GB","United Kingdom","Reino Unido","UK"]
  var listed =[] ;
  var timeListed = "";

  Data.map(function(content,index)
  {
    score=50;

    //Location Component
    if(homeLocation.includes(((content.location).split(','))[1].substring(1)))
    {
      score = score+5;
    }


    if(content.price.substring(0,1)!="£")
    {
      console.log("The currency " + content.price.substring(0,1));
    }

    //Time Listed Component
    listed = content.listed;
    timeListed = (listed.split(" "))[2];
    if(timeListed == "SECONDS")
    {
      score += 8;
    }
    else if(timeListed == "MINUTES")
    {
      score += 6;
    }
    else if(timeListed == "DAYS")
    {
      score += 3;
    }
    else if(timeListed == "WEEKS")
    {
      score += 1;
    }
  });
}
printAllData()
{
  return Data.map((content, index)=>{
    return<div>
    <h1>{index}</h1>
    <h3>{content.seller}</h3>
    <p>{content.desc}</p>
    <p>{content.price}</p>
    <p>{content.size}</p>
    <p>{((content.location).split(','))[1]}</p>
    <p>{content.listed}</p>
    </div>
  })
}
calcAvePrice()
{
  var total =0;
  var price =0;
  var quantity = 0;

  Data.map(function(content,index)
  {
    price = parseInt((content.price).substring(1));
    total = total + price;
    quantity = index+1;
  });

  console.log("index - "+ quantity);
  console.log("average price - "+ (total/quantity))
  return "Total Market Value is : £" + total;
}

render()
  {

      return(

        <div>
          {this.calcScore()}
        </div>
      );
  }

}

export default TopListings;
