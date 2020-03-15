import React, {Component} from 'react';
import Data from '../data/data.json'
import * as firebase from 'firebase';

class uploadScrape extends Component
{
  constructor()
  {
    super();
    this.state = {
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
      const databaseRef = firebase.database().ref("/");

      databaseRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot,index){
          childSnapshot.forEach(function(childChildSnapshot,index){

            var childChildKey = childChildSnapshot.key;
            console.log("child child key = " + childChildKey);
            if(date == childChildKey)
            {
              console.log("Date matches");
              return false;
            }
          });
        });
      });
      return true;
  }
writeData(product)
{
  var date = this.state.date;
  const trainerRef = firebase.database().ref().child(product);
  const indexRef = trainerRef.child(date);
  var dataArray = [];
  var currentDate = new Date();
  var formattedDate = currentDate.getFullYear()+"-"+currentDate.getMonth()+1+"-"+currentDate.getDate()+ " " + currentDate.getHours() + ":" + currentDate.getMinutes();

  dataArray =
  {
    time: formattedDate
  };

  indexRef.push(dataArray)
}
writeRawJSON(product)
{
  var dataArray = [];
  var date = this.state.date;
  const trainerRef = firebase.database().ref().child(product);
  const indexRef = trainerRef.child(date);

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

    indexRef.push(dataArray)
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
  var product;
  if(this.props.term.length>3)
  {
    product = this.props.term;
  }
  else {
    product = this.getProduct();
  }
  if(this.checkIfDateIsWritten())
  {
    this.writeData(product)
    this.writeRawJSON(product)
  }
}

render()
{
console.log("State = "+this.state.date);
  console.log("PROPS = "+this.props.term);
  this.writeToFirebase();

  return(
  <p>Upload Success</p>
  );
}
}

export default uploadScrape;
