import React, {Component} from 'react';
import Data from '../data/data.json';
import ConvertCurrency from '../dataManipulationScripts/convertCurrency.js';

class TopListings extends Component
{

descScore(desc)
{
  console.log("desc: "+ desc)
}
calcScore()
{
  var scores =[];
  var score = 100;
  var homeLocation = ["GB","United Kingdom","Reino Unido","UK"]
  var listed =[] ;
  var timeListed = "";
  var size=0.0;
  Data.map(function(content,index)
  {
    score=50;

    //Location Component
    // if(homeLocation.includes(((content.location).split(','))[1].substring(1)))
    // {
    //   score = score+5;
    // }


    if(content.price.substring(0,1)!=="£")
    {
      console.log("The currency " + content.price.substring(0,1));
    }

    //Time Listed Component
    listed = content.listed;
    timeListed = (listed.split(" "))[2];
    if(timeListed === "SECONDS")
    {
      score += 8;
    }
    else if(timeListed === "MINUTES")
    {
      score += 6;
    }
    else if(timeListed === "DAYS")
    {
      score += 3;
    }
    else if(timeListed === "WEEKS")
    {
      score += 1;
    }

    //Size Component
    //If there is no size then there is no addition
    size = parseFloat((content.size).substring(3));
    if(size%1 <2)
    {
      if(size>=9)
      {
        score = score + 9-(size%9);
      }
      else
      {
        score = score + (size%9);
      }
    }

    //Price Components
    var price = parseFloat(content.price.substring(1));
    console.log(price);
    //The lower the price the higher the score addition
    //DOUBLE CHECK THE 500 VALUE, IF GOODS ARE GREATER THAN 500 WE HAVE A PROBLEM
    score = score + ((500-price)/25)

    console.log("score: " + score)
    scores[index] = score;

  })
  return scores;
}
printAllData(scores)
{
  return Data.map((content, index)=>{
    return<div>
    <h1>{index}</h1>
    <h1>{scores[index]}</h1>
    <h3>{content.seller}</h3>
    <p>{content.desc}</p>
    <p>{content.price}</p>
    <p>{content.size}</p>
    <p>{((content.location).split(','))[1]}</p>
    <p>{content.listed}</p>
    <p>{content.url}</p>
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
          {this.printAllData(this.calcScore())}
        </div>
      );
  }

}

export default TopListings;
