import React, {Component} from 'react';
import Data from './data/data.json'
import * as firebase from 'firebase';

class uploadScrape extends Component
{

componentDidMount()
{
    const trainerRef = firebase.database().ref().child('TrainerNameID');
    const indexRef = trainerRef.child('IndexedValue');
    const averagePriceRef = indexRef.child('AveragePrice');

    // console.log("trainerRef: " + trainerRef);
    // console.log("indexRef: " + indexRef);
    // console.log("averagePriceRef: " + averagePriceRef);

    averagePriceRef.on('value', snap =>{
      this.setState({
        averagePrice: snap.val()
      });
    });

    return 0;
}
calcAvePrice()
{
  var total =0;

  Data.map(function(postDetail)
  {
    total = total + parseInt((postDetail.price).substring(1))
  });

  return "Total Market Value is : £" + total;
}

render()
{
  return(
  <p>Upload Success</p>
  );
}
}

export default uploadScrape;
