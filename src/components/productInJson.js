import React, {Component} from 'react';
import Data from '../data/data.json';

class productInJson extends Component
{


  render()
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

  return (
    <div>
      <h4>{product}</h4>
    </div>
  );
  }
}

export default productInJson;
