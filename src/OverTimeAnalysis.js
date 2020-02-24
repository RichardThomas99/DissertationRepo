import React, {Component} from 'react';
import OverTimeText from './components/OverTimeText';
import SearchBar from './components/SearchBar'

class OverTimeAnalysis extends Component
{
render()
  {
      return(
        <div>
          <h1>Over-Time Analysis</h1>
          <OverTimeText/>
          <SearchBar/>
        </div>
      );
  }

}

export default OverTimeAnalysis;
