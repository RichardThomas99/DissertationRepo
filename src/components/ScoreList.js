import React, {Component} from 'react';
import Data from '../data/data.json';

class TopListings extends Component
{

calcScore()
{
  var scores =[];
  var score = 100;
  var listed =[] ;
  var timeListed = "";
  var size=0.0;

  //General Weighting settings
  var numberOfTotalWeights = 4;
  var timeListedWeight=5;
  var sizeWeight=7;
  var priceWeight=10;
  var sellerWeight=4;

  Data.map(function(content,index)
  {
    score=0;


    //Time Listed Component
    listed = content.listed;
    timeListed = (listed.split(" "))[2];
    if(timeListed === "SECONDS")
    {
      score += 10*timeListedWeight;
    }
    else if(timeListed === "MINUTES")
    {
      score += 8*timeListedWeight;
    }
    else if(timeListed === "DAYS")
    {
      score += 5*timeListedWeight;
    }
    else if(timeListed === "WEEKS")
    {
      score += 2*timeListedWeight;
    }

    //Size Component
    //If there is no size then there is no addition
    size = parseFloat((content.size).substring(3));
    if(size%1 <2)
    {
      if(size>=9)
      {
        score = score + 10-(size%9)*sizeWeight;
      }
      else
      {
        score = score + ((size%9)+1)*sizeWeight;
      }
    }

    //Price Components
    var price = parseFloat(content.price.substring(1));

    //The lower the price the higher the score addition
    //DOUBLE CHECK THE 500 VALUE, IF GOODS ARE GREATER THAN 500 WE HAVE A PROBLEM
    if(price>500)
    {
      score = score - 5;
    }
    else {
      score = score + (-0.02*price + 10)*priceWeight;
    }
    console.log("price score = "+ (-0.02*price + 10)*priceWeight);



    //SELLER RATING
    var stars = content.stars.split("<");
    var starCount=0;

    for(var i=0;i<stars.length;i++)
    {
      if(stars[i]=="Full Star")
      {
        starCount++;
      }
      if(stars[i]=="Half Star")
      {
        starCount = starCount +0.5;
      }
    }

    if(content.reviews<10)
    {
      score = score + starCount*1*sellerWeight;
    }
    else if(content.reviews < 50)
    {
      score = score +starCount*1.5*sellerWeight;
    }
    else {
      score = score + starCount*2*sellerWeight;
    }


    console.log("score = " + score);
    score=score/numberOfTotalWeights;
    scores[index] = score;

  })
  return scores;
}

printAllData(scores)
{

  return Data.map((content, index)=>{

    return(<div>
    <h1>{index}</h1>
    <h1>{scores[index]}</h1>
    <h3>{content.seller}</h3>
    <p>{content.desc}</p>
    <p>{content.price}</p>
    <p>{content.size}</p>
    <p>{((content.location).split(','))[1]}</p>
    <p>{content.listed}</p>
    <p>{content.followers}</p>
    <p>{content.stars}</p>
    <p>{content.reviews}</p>
    <a href={content.url}>{content.url}</a>
    </div>);
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
