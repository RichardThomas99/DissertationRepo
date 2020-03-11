import React, {Component} from 'react';
import SearchBar from './components/SearchBar'

//components
import PriceDistributionGraph from './components/PriceDistributionGraph';
import AveragePrice from './components/AveragePrice';
import SizeAnalysis from './components/SizeAnalysis';

class RealTimeAnalysis extends Component
{
render()
  {
      return(
        <div>
          <h1>RealTimeAnalysis</h1>
          <SearchBar/>

          <h2>*****************************************************************************************</h2>

          <AveragePrice/>

          <h2>*****************************************************************************************</h2>

          <PriceDistributionGraph/>

          <h2>*****************************************************************************************</h2>

          <SizeAnalysis/>

        </div>
      );
  }

}

export default RealTimeAnalysis;
