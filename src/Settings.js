import React, {Component} from 'react';

import Data from './data/data.json'

class Settings extends Component
{
  testXML()
  {
    console.log(Data[0].desc);

  }

  render()
  {
      return(
        <div>
          <h1>Settings</h1>
          {this.testXML()}
        </div>
      );
  }

}

export default Settings;
