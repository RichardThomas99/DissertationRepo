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
      var unique = true;
      const databaseRef = firebase.database().ref("/");

      databaseRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot,index){
          childSnapshot.forEach(function(childChildSnapshot,index){

            var childChildKey = childChildSnapshot.key;
            if(date == childChildKey)
            {
              childChildSnapshot.forEach(function(childChildChildSnapshot,index)
              {
                var childChildChildKey = childChildChildSnapshot.key;

                console.log("PREAMBLE CHILDCHILDCHILD BIT");
                if(childChildChildKey == "Preamble")
                {
                  console.log(" PREAMBLE Date matches = " + childChildChildKey);
                  unique = false;
                }
              });
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
  var dataName = this.props.dataName;
  var data = this.props.data;

  const trainerRef = firebase.database().ref().child(product);
  const dateRef = trainerRef.child(date);
  const preambleRef = dateRef.child("Preamble");

  dataArray =
  {
    dataName: data,
  };

    preambleRef.push(dataArray)

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
  var product = this.props.product;
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
  }
}

render()
{
    console.log("IN UPLOAD PREAMBLE*******");
  this.writeToFirebase();

  return(
  <div>
    <p>Upload Successful</p>
  </div>
  );
}
}

export default uploadScrape;
