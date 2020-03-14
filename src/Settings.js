import React, {Component} from 'react';
import StorePopUp from './components/StorePopUp'
import Data from './data/data.json'

class Settings extends Component
{


  render()
  {
      return(
        <div>
          <h1>Settings</h1>
          <StorePopUp/>
        </div>
      );
  }

}

export default Settings;
