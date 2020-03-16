import React, {Component} from 'react';
import Data from '../data/data.json'
import * as firebase from 'firebase';
import Preamble from './PreambleData';
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
writePreambleData(product)
{
  var dataArray = [];
  var date = this.state.date;
  const trainerRef = firebase.database().ref().child(product);
  const dateRef = trainerRef.child(date);
  const preambleRef = dateRef.child("Preamble");

  dataArray =
  {
    date: date,
    averagePrice: 99.99,
    averageListing: "20 Hours",
  };

    preambleRef.push(dataArray)

    return 0;
}
writeData(product)
{
  var dataArray = [];
  var date = this.state.date;

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
  var product = this.props.term;
  console.log("product = " + product);
  if((product.length<4)||(product == "[New Save Location]") ||(product =="[Not Set]"))
  {
    console.log("product = " + product);
    product = this.getProduct();
  }
  else
  {
      product = this.props.term;
  }
  console.log(product);

  if(this.checkIfDateIsWritten())
  {
    this.writePreambleData(product);
    this.writeData(product);
  }
}

render()
{
  this.writeToFirebase();
  var pre = <Preamble/>;
  console.log("pre = " + pre);
  return(
    <div>
  <p>Upload Success</p>
  <Preamble/>
  </div>
  );
}
}

export default uploadScrape;
