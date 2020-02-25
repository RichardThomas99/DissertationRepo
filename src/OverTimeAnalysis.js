import React, {Component} from 'react';

//Components
import OverTimeText from './components/OverTimeText';
import SearchBar from './components/SearchBar';
import DecayRate from './components/DecayRate';
import AveragePriceOverTime from './components/AveragePriceOverTime';
class OverTimeAnalysis extends Component
{
render()
  {
      return(
        <div>
          <h1>Over-Time Analysis</h1>
          <OverTimeText/>
          <SearchBar/>
          <DecayRate/>
          <AveragePriceOverTime/>
        </div>
      );
  }

}

export default OverTimeAnalysis;
