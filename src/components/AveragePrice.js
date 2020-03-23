import React, {Component} from 'react';
import Data from '../data/data.json';
import CalcAveragePrice from '../dataManipulationScripts/CalcAveragePrice.js';

class AveragePrice extends Component
{


  render()
  {
    var lowerBound = 15.00;
    var upperBound = 160.00;


  return (
    <div>

    <h3>Average Price: £<CalcAveragePrice saveData = {false} upperBound= {upperBound} lowerBound = {lowerBound}/></h3>
    <p>Settings behind this average are listed below. </p>
      <ul id="content-list">
          <li>Original Array Used = Untampered</li>
          <li>Lower bounds = £{lowerBound}</li>
          <li>Upper bounds = £{upperBound}</li>
      </ul>
    </div>
  );
 }
}

export default AveragePrice;
