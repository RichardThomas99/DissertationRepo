import React, {Component} from 'react';
import Data from '../data/data.json'
import * as firebase from 'firebase';


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
  checkIfDateIsWritten(currentDate)
  {
      var date = this.state.date;
      var snapshot;
      var array = [];
      var count = 0;
      var unique = true;
      const databaseRef = firebase.database().ref("/");

      databaseRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot,index){
          childSnapshot.forEach(function(childChildSnapshot,index){

            var childChildKey = childChildSnapshot.key;
            if(date == childChildKey)
            {
              console.log("Date matches");
              unique = false;
            }
          });
        });
      });
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
      /*Price calculations .... */
      if((content.price).length>7)
      {

      }

      price = parseInt((content.price).substring(1));

      if((price<maxPrice) &&(price>=minPrice))
      {
        totalPrice = totalPrice + price;
        quantityPrice++;
      }

      /*calculating size Distribution .....................................................*/
      if(content.size.length>2){
        sizeArray[index] =  parseFloat((content.size).substring(3));
      }
      else{
        sizeArray[index] = this.getSize(content.desc);
      }
      priceArray[index] = parseInt((content.price).substring(1));


    /*Calculating the average listing time across all listings ...............................*/
    timeTerm = (content.listed).split(" ")[2];
    timeVal = parseInt((content.listed).split(" ")[1]);

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
  writePreambleData()
  {
    var dataArray = [];
    var date = this.state.date;
    var product = this.state.product;
    const trainerRef = firebase.database().ref().child(product);
    const dateRef = trainerRef.child(date);
    const preambleRef = dateRef.child("Preamble");

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

      preambleRef.push(dataArray)

      return 0;
  }
writeData()
{
  var dataArray = [];
  var date = this.state.date;
  var product = this.state.product;
  console.log("asdfasggggggdf product "+product);
  const trainerRef = firebase.database().ref().child(product);
  const dateRef = trainerRef.child(date);
  const dataRef = dateRef.child("Data");

  Data.map(function(content,index)
  {
    dataArray =
    {
      price: content.price,
      seller: content.seller,
      desc: content.desc,
      price: content.price,
      size: content.size,
      location: content.location,
      listed: content.listed
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
    if(((Data[i].desc).split('\r\n'))[0].length >length)
    {
      product = (((Data[i].desc).split('\r\n'))[0]);
    }
  }
  product = product.replace(/ /g,'');
  return product;
}
writeToFirebase()
{
  var productTitle = this.props.term;
  console.log("product = " + productTitle);
  if((productTitle.length<4)||(productTitle == "[New Save Location]") ||(productTitle =="[Not Set]"))
  {
    console.log("product = " + productTitle);
    productTitle = this.getProduct();
  }
  else
  {
      productTitle = this.props.term;
  }
  console.log(productTitle);

  if(this.checkIfDateIsWritten())
  {
      this.setState({product: productTitle}, function () {
    console.log("product state = "+this.state.product);
    this.writePreambleData();
    this.writeData();
});
      console.log("asdfasdf state product = " + this.state.product);

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
