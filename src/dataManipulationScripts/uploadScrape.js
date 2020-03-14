import React, {Component} from 'react';
import Data from '../data/data.json'
import * as firebase from 'firebase';

class uploadScrape extends Component
{

writeData(product)
{
  const trainerRef = firebase.database().ref().child(product);
  const indexRef = trainerRef.child('IndexedValue');
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
  const trainerRef = firebase.database().ref().child(product);
  const indexRef = trainerRef.child('IndexedValue');

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

  {this.writeData(product)}
  {this.writeRawJSON(product)}
}

render()
{
  console.log("PROPS = "+this.props.term);
  this.writeToFirebase();

  return(
  <p>Upload Success</p>
  );
}
}

export default uploadScrape;
