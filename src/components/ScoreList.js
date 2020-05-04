import React, {Component} from 'react';
import Data from '../data/data.json';

/**
 * A ReactJS class which supplies the text for the top listing portion of the software.
 * @example
 * return (
 *    <div>
 *      <h1>{scores[index]}</h1>
 *      <h3>{content.Seller}</h3>
 *      <p>{content.Desc}</p>
 *      <p>{content.Price}</p>
 *      <p>{content.Size}</p>
 *      <p>{((content.Location).split(','))[1]}</p>
 *      <p>{content.Listed}</p>
 *      <p>{content.Followers}</p>
 *      <p>{content.Stars}</p>
 *      <p>{content.Reviews}</p>
 *      <a href={content.Url}>{content.Url}</a>
 *    </div>
 * )
 */
class ScoreList extends Component
{

calcScore()
{
  var scores =[];
  var score = 0;
  var listed =[] ;
  var timeListed = "";
  var size=0.0;

  //The maximum Score a factor can give
  var factorScoreMax = 10;

  //General Weighting settings
  var timeListedWeight=300;
  var sizeWeight=1000;
  var priceWeight=20000;
  var sellerWeight=1000;

  var sumOfWeights = timeListedWeight+sizeWeight+priceWeight+sellerWeight;

  Data.map(function(content,index)
  {
    score=0;

    //Time Listed Component
    listed = content.Listed;
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
    size = parseFloat((content.Size).substring(3));
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
    var price = parseFloat(content.Price.substring(1));

    /*The lower the price the higher the score addition using a linear y=mx+c
    *relationship for score against price. Sets max price accepted as 500*/
    if(price>500)
    {
      score = score - 5; //Anything above £500 gets its score detrimented.
    }
    else {
      score = score + (-0.02*price + 10)*priceWeight;
    }


    //SELLER RATING
    var stars = content.Stars.split("<");
    var starCount=0;

    //Calculates the number of stars rating a seller has
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

    //Groups the number of reviews a user has
    if(content.Reviews<10)
    {
      score = score + starCount*1.5*sellerWeight;
    }
    else if(content.Reviews < 50)
    {
      score = score +starCount*1.7*sellerWeight;
    }
    else {
      score = score + starCount*2*sellerWeight;
    }

    //Returns a score out of 100
    score = (100*score)/(sumOfWeights*factorScoreMax)
    scores[index] = score;
  })
  return scores;
}

printAllData(scores)
{

  return Data.map((content, index)=>{

    return(<div>
    <h1>{scores[index]}</h1>
    <h3>{content.Seller}</h3>
    <p>{content.Desc}</p>
    <p>{content.Price}</p>
    <p>{content.Size}</p>
    <p>{((content.Location).split(','))[1]}</p>
    <p>{content.Listed}</p>
    <p>{content.Followers}</p>
    <p>{content.Stars}</p>
    <p>{content.Reviews}</p>
    <a href={content.Url}>{content.Url}</a>
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
    price = parseInt((content.Price).substring(1));
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

export default ScoreList;
