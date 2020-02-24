import React, {Component} from 'react';
import ScoreText from './components/ScoreText';
import SearchBar from './components/SearchBar'

class TopListings extends Component
{
render()
  {
      return(
        <div>
          <h1>TopListings</h1>
          <ScoreText/>
          <SearchBar/>
        </div>
      );
  }

}

export default TopListings;
