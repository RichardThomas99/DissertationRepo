import {gql} from 'apollo-boost';

const nikeAirMax97SilverBulletsQuery = gql`
{
  viewer {
    productSearch(query: "Adidas yung 1", first: 105, before: null, last: null)
    {
      edges
      {
        node
        {
          price
          {
            display
          }
          id
          description
          dateUpdated
          country
        	seller
          {
        	  username
            reviewsCounters
            {
              rating
              numReviewAsBuyer
              numReviewAsSeller
            }

        	}
        }
      }
    }
  }
}
`

export{nikeAirMax97SilverBulletsQuery};
