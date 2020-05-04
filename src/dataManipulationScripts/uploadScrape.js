import React, {Component} from 'react';
import Data from '../data/data.json'
import * as firebase from 'firebase';

/**
 * A JS Class which is in control of updating the Firebase to append the JSON
 * contents the user wants to upload.
 * @example
 * return (
 *    <div>
 *        <p>Upload Success</p>
 *    </div>
 * )
 */
class uploadScrape extends Component
{
  constructor()
  {
    super();
    this.state = {
      product: "none",
      date: this.currentDate(),
    };
  }

  currentDate()
  {
    var today = new Date();
    var date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();
    console.log("DATE = " + date);
    return date;
  }

  //Function to stop overwriting todays scrape data
  checkIfDateIsWritten(product)
  {
      //Todays Date
      var date = this.state.date;
      var snapshot;
      var array = [];
      var unique = true;

      //Finding the appropriate reference in the database
      const trainerRef = firebase.database().ref().child(product);
      trainerRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot,index){
          var snapshotDate = childSnapshot.key;

          //If a scrape has already been written today, this is true.
          if(date == snapshotDate)
          {
            unique = false;
          }
        });
      });

      //If true: it is safe to save the data.
      return unique;
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
      temp = (y+3)/2;
      console.log("average for size"+temp +": " + averagesArray[y]);
    }

    return [quantityArray,averagesArray];
  }


//Applies regex to return size or -1 if unable to attain size.
getSize(desc)
{
  var regexOut;
  //Three Different Regular expressions to obtain size
  //Size __ 3.
  const re = /size.(\d\d?(?:\.5)?)/i;
  //UK 3.
  const re2 = /uk.?(\d\d?(?:\.5)?)/i;
  //Size 4.
  const re3 = /size.\w*\W*.?(\d\d?(?:\.5)?)/i;

  if(re.exec(desc) != null){
    regexOut = re.exec(desc);
    return regexOut[1];
  }
  else if(re2.exec(desc) != null){
    regexOut = re2.exec(desc);
    return regexOut[1];
  }
  else if (re3.exec(desc) != null){
    regexOut = re3.exec(desc);
    return regexOut[1];
  }
  else{
    //If the size is not found
    return -1;
  }
}
  calcPreambleData( )
  {
    var totalPrice =0;
    var price =0;
    var quantityPrice = 0;
    var minPrice = 15.00;
    var maxPrice = 160.00;

    var sizeArray = [];
    var priceArray = [];

    var timeTerm="";
    var timeVal ="";
    var totalListed = 0;
    var quantityListed = 0;

    Data.map((content,index)=>
    {
      price = parseInt((content.Price).substring(1));

      if((price<maxPrice) &&(price>=minPrice))
      {
        totalPrice = totalPrice + price;
        quantityPrice++;
      }

      /*calculating size Distribution .....................................................*/
      if(content.Size.length>2){
        sizeArray[index] =  parseFloat((content.Size).substring(3));
      }
      else{
        sizeArray[index] = this.getSize(content.Desc);
      }
      priceArray[index] = parseInt((content.Price).substring(1));


    /*Calculating the average listing time across all listings ...............................*/
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

    totalListed = totalListed + timeVal;
    quantityListed++;
    });

    var averageListed = totalListed/quantityListed;
    var averagePrice = totalPrice/quantityPrice;

    var distribution = Array(2);
    distribution[0] = new Array(25);
    distribution[1] = new Array(25);

    distribution = this.getDistribution(sizeArray,priceArray);

    return [averagePrice,minPrice,maxPrice,distribution[0],distribution[1],averageListed];
  }

  //Writing the preamble in firebase
  writePreambleData(product)
  {
    var dataArray = [];
    var date = this.state.date;
    //Getting a reference to the specific database location
    const trainerRef = firebase.database().ref().child(product);
    const dateRef = trainerRef.child(date);
    const preambleRef = dateRef.child("Preamble");

    //Getting the preamble data
    var preambleData = this.calcPreambleData();

    dataArray =
    {
      averagePrice: preambleData[0],
      minPrice: preambleData[1],
      maxPrice: preambleData[2],
      quantPerSize: preambleData[3],
      pricePerSize: preambleData[4],
      averageListed: preambleData[5],
    };

    //Writing the array to firebase
    preambleRef.push(dataArray)

    return 0;
  }

//Writing the Raw Scrape data from the JSON to Firebase
writeData(product)
{
  var dataArray = [];
  var date = this.state.date; //Getting todays date

  //getting the reference for the data, using the product variable to define name.
  const trainerRef = firebase.database().ref().child(product);
  const dateRef = trainerRef.child(date);
  const dataRef = dateRef.child("Data");

//Mapping through data content and pushing each listing to Firebase individually.
  Data.map(function(content,index)
  {
    dataArray =
    {
      price: content.Price,
      seller: content.Seller,
      desc: content.Desc,
      price: content.Price,
      size: content.Size,
      location: content.Location,
      listed: content.Listed
    };

    dataRef.push(dataArray)
  });
    return 0;
}

getProduct()
{
  var product;
  var i=0;
  var length =0;

  for(i=0;i<5;i++)
  {
    if(((Data[i].Desc).split('\r\n'))[0].length >length)
    {
      product = (((Data[i].Desc).split('\r\n'))[0]);
    }
  }
  product = product.replace(/ /g,'');
  return product;
}

writeToFirebase()
{
  var productTitle = this.props.term;

  //If the productTitle isn't a sufficient. Calculate the new product name
  if((productTitle.length<4)||(productTitle == "[New Save Location]") ||(productTitle =="[Not Set]"))
  {
    productTitle = this.getProduct();
  }
  else
  {
      productTitle = this.props.term;
  }

  if(this.checkIfDateIsWritten(productTitle))
  {
      this.writePreambleData(productTitle);
      this.writeData(productTitle);
  }
}

render()
{
  this.writeToFirebase();

  return(
    <div>
    <p>Upload Success</p>
  </div>
  );
}
}

export default uploadScrape;
