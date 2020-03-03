import React, {Component} from 'react';
import Data from '../data/data.json'
import * as firebase from 'firebase';

class uploadScrape extends Component
{

writeData()
{
  const trainerRef = firebase.database().ref().child('TrainerNameID');
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
writeRawJSON()
{
  var dataArray = [];
  const trainerRef = firebase.database().ref().child('TrainerNameID');
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

writeToFirebase()
{
  {this.writeData()}
  {this.writeRawJSON()}
}
render()
{
  {this.writeToFirebase()}
  return(
  <p>Upload Success</p>
  );
}
}

export default uploadScrape;
