import React, {Component} from 'react';
import Data from '../data/data.json'
import * as firebase from 'firebase';

import UploadPreamble from '../dataManipulationScripts/uploadPreamble.js';

class uploadScrape extends Component
{
  constructor()
  {
    super();
    this.state = {
      visible: false,
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

writeData()
{
  var dataArray = [];
  var date = this.state.date;
  var product = this.state.product;
  console.log("asdfasdf product "+product);
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
      this.setState({product: productTitle, visible: !this.state.visible}, function () {
    console.log("product state = "+this.state.product);
    this.writeData();
});
      console.log("asdfasdf state product = " + this.state.product);

  }
}

render()
{
  var uploadPreamble="";
  this.writeToFirebase( function () {
     uploadPreamble = this.state.visible ? (

        <UploadPreamble product = {this.state.product} dataName = "average" data = "56.80"/>
      ):(<div/>);
      console.log("asdfasdfasdf state state product = "+this.state.product);
});


  return(
    <div>
    {uploadPreamble}
    <p>Upload Success</p>
  </div>
  );
}
}

export default uploadScrape;
