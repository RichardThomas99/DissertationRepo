import React, {Component} from 'react';
import Data from '../data/data.json';
import Product from './productInJson'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import * as firebase from 'firebase';
import UploadScrape from '../dataManipulationScripts/uploadScrape.js'

class StorePopUp extends Component
{

  constructor() {
  super();

//THIS NEEDS MAJOR REFACTORING TO RE ORDER THESE METHODS TO A MOST OPTIMAL SOLUTION...

  this.state = {
    showMenu: false,
    currentJSON: <Product/>,
    saveLocation: "[Not Set]",
    visible:false,
  };

  this.showMenu = this.showMenu.bind(this);
  this.closeMenu = this.closeMenu.bind(this);
}

showMenu(event) {
  event.preventDefault();

  this.setState({ showMenu: true }, () => {
    document.addEventListener('click', this.closeMenu);
  });
}

closeMenu(event) {

  if (!this.dropdownMenu.contains(event.target)) {

    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });

  }
}

  /* componentDidMount()
  {
      var snapshot;
      const databaseRef = firebase.database().ref("/");
      const trainerRef = databaseRef.child('TrainerNameID');
      const indexRef = trainerRef.child('IndexedValue');

      console.log("databaseRef: " + databaseRef);
      console.log("trainerRef: " + trainerRef);
      console.log("indexRef: " + indexRef);

      indexRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){

          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log("child key = " + childKey);
          console.log("child Data = "+ childData);

          childSnapshot.forEach(function(childChildSnapshot){
            var childChildKey = childChildSnapshot.key;
            var childChildData = childChildSnapshot.val();

            console.log("Child child key = " + childChildKey);
            console.log("Child child Data = "+ childChildData);
          });
        });
      });
      return 0;
  }*/

  getCollections()
  {
      var snapshot;
      var array = [];
      var count = 0;
      const databaseRef = firebase.database().ref("/");

      databaseRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot,index){

          var childKey = childSnapshot.key;
          console.log("child key = " + childKey);
          array[count] = childKey;
          count++;
        });
      });
      array[count] ="[New Save Location]";
      return array;
  }
  onSave(item)
  {
    this.setState({saveLocation: item});
  }

  dropdown(array)
  {
    return(
      <div>
        <button onClick={this.showMenu}>
          Possible Save Locations
        </button>

        {this.state.showMenu? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                {array.map((item, i)=>{
                    return(
                      <button onClick={(e) => {e.preventDefault(); this.onSave(item);}}>
                        {item}
                      </button>
                    );
                  })}
              </div>)
              : (null)
        }
      </div>
    );
  }


  render()
  {
    var array = this.getCollections();
    const upload = this.state.visible ? (
      <UploadScrape term = {this.state.saveLocation}/>
    ):(<div/>);

  return (
    <div>

    <h3>Current JSON contains = {this.state.currentJSON}</h3>
    <p>Choose the save location of the new JSON from the dropdown below </p>


    {this.dropdown(array)}
    <p>You are looking to put {this.state.currentJSON} in the location named: {this.state.saveLocation}</p>
    <button onClick={() => {this.setState({visible: !this.state.visible});}}>
      CONFIRM SAVE
    </button>
    {upload}
    </div>
  );
 }
}

export default StorePopUp;
