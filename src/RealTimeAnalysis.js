import React, {Component} from 'react';
import SearchBar from './components/SearchBar'

//components
import PriceDistributionGraph from './components/PriceDistributionGraph';
import AveragePrice from './components/AveragePrice';
import SizeAnalysis from './components/SizeAnalysis';
import Data from './data/data.json';
import Product from './components/productInJson'
import ListedTimeDistribution from './components/ListedTimeDistribution.js'

class RealTimeAnalysis extends Component
{

render()
  {
      return(
        <div>
          <h1>RealTimeAnalysis</h1>
          <SearchBar/>
          <Product/>
          <h2>*****************************************************************************************</h2>

          <AveragePrice/>

          <h2>*****************************************************************************************</h2>

          <PriceDistributionGraph/>

          <h2>*****************************************************************************************</h2>

          <SizeAnalysis/>

          <h2>*****************************************************************************************</h2>

          <ListedTimeDistribution/>

        </div>
      );
  }

}

export default RealTimeAnalysis;
