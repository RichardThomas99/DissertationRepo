import React, {Component} from 'react';
import Data from '../data/data.json';

/**
 * A React JavaScript class which determines the contents of the JSON file
 * @example
 * return (
 *   <div>
 *     <h2>{product}</h2>
 *   </div>
 * )
 */
class productInJson extends Component
{


  render()
  {
    var product;
    var i=0;
    var length =0;

    for(i=0;i<5;i++)
    {
      if(((Data[i].Desc).split('\r\n'))[0].length >length)
      {
        product = (((Data[i].Desc).split('\r\n'))[0]);
      }
    }

  return (
    <div>
      <h2>{product}</h2>
    </div>
  );
  }
}

export default productInJson;
