import React, {Component} from 'react';

//Components
import OverTimeText from './components/OverTimeText';
import SearchBar from './components/SearchBar';
import DecayRate from './components/DecayRate';

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
        </div>
      );
  }

}

export default OverTimeAnalysis;
