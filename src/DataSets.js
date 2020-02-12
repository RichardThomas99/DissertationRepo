import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import{graphql} from 'react-apollo';
import {nikeAirMax97SilverBulletsQuery} from './queries/queries';

//components
import PriceDistributionGraph from './components/PriceDistributionGraph';
import AveragePrice from './components/AveragePrice';
import SizeAnalysis from './components/SizeAnalysis';

class DataSets extends Component
{

  mapArraysTogether(priceArray,descriptionArray)
  {
    var b = priceArray
    var a = descriptionArray

    var c = a.map(function(e, i) {
      return [e, b[i]];
    });

    console.log(c[0][0]);


    return c;
  }
  getData()
  {
    var data = this.props.data;


      const priceArray = data.viewer.productSearch.edges.map(edges=> edges.node.price.display );

      //  console.log(priceArray);
      // const idArray = data.viewer.productSearch.edges.map(edges=> edges.node.id );
      //   console.log(idArray);

      const descriptionArray = data.viewer.productSearch.edges.map(edges=> edges.node.description );
      //  console.log(descriptionArray[1]);
      // const dateUpdatedArray = data.viewer.productSearch.edges.map(edges=> edges.node.dateUpdated );
      //   console.log(dateUpdatedArray);
      // const countryArray = data.viewer.productSearch.edges.map(edges=> edges.node.country);
      //   console.log(countryArray);
      //
      // const sellerNameArray = data.viewer.productSearch.edges.map(edges=> edges.node.seller.username );
      //   console.log(sellerNameArray);
      // const sellerRatingArray = data.viewer.productSearch.edges.map(edges=> edges.node.seller.reviewsCounters.rating );
      //   console.log(sellerRatingArray);
      // const numReviewBuyerArray = data.viewer.productSearch.edges.map(edges=> edges.node.seller.reviewsCounters.numReviewAsBuyer );
      //   console.log(numReviewBuyerArray);
      // const numReviewSellerArray = data.viewer.productSearch.edges.map(edges=> edges.node.seller.reviewsCounters.numReviewAsSeller);
      //   console.log(numReviewSellerArray);

      //return [priceArray,idArray,descriptionArray,dateUpdatedArray,countryArray,sellerNameArray,sellerRatingArray,numReviewBuyerArray,numReviewSellerArray];


      return [priceArray,descriptionArray];
  }


  render()
  {
    var x = new Array(205);
    var priceArray = "";
    var descriptionArray = "";

    for (var i = 0; i < x.length; i++)
    {
      x[i] = new Array(2);
    }


  var data = this.props.data;
  console.log(this.props);
  try
  {
  if(!data.loading)
  {

    var temp = this.getData();

    priceArray = temp[0];
    descriptionArray = temp[1];

    x = this.mapArraysTogether(temp[0],temp[1]);
    //console.log("x00: " + x[0][1]);
  }
}
catch(exception)
{
    console.log('There was an ERROR CAUGHT getting data from GraphQL! The exception was: '+ exception);
}

  return(
    <div>
        <h2>*****************************************************************************************</h2>

        <AveragePrice loading = {data.loading} content = {priceArray}/>

        <h2>*****************************************************************************************</h2>

        <PriceDistributionGraph array = {priceArray}/>

        <h2>*****************************************************************************************</h2>

        <SizeAnalysis loading = {data.loading} array = {x}/>

    </div>
  );

 }
}

export default graphql (nikeAirMax97SilverBulletsQuery)(DataSets);
