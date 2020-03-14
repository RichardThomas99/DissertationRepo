import React, {Component} from 'react';
import Data from '../data/data.json';
import Product from './productInJson'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import * as firebase from 'firebase';

class StorePopUp extends Component
{

  constructor() {
  super();

  this.state = {
    showMenu: false,
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
      const trainerRef = databaseRef.child('TrainerNameID');
      const indexRef = trainerRef.child('IndexedValue');

      console.log("databaseRef: " + databaseRef);
      console.log("trainerRef: " + trainerRef);
      console.log("indexRef: " + indexRef);

      databaseRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot,index){

          var childKey = childSnapshot.key;
          console.log("child key = " + childKey);
          array[count] = childKey;
          count++;
        });
      });
      return array;
  }

  dropdown(array)
  {
    return(
      <div>
        <button onClick={this.showMenu}>
          Show menu
        </button>

        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                {array.map(function(item, i){return <button>{item}</button>})}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }


  render()
  {
    var array = this.getCollections();
  return (
    <div>

    <h3>Current JSON contains = <Product/></h3>
    <p>Settings behind this average are listed below. </p>

    <ul>
    {this.dropdown(array)}
    </ul>

    </div>
  );
 }
}

export default StorePopUp;
