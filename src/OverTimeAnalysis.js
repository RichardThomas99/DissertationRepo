import React, {Component} from 'react';

//Components
import OverTimeText from './components/OverTimeText';
import SearchBar from './components/SearchBar';
import DecayRate from './components/DecayRate';
import AveragePriceOverTime from './components/AveragePriceOverTime';
import * as firebase from 'firebase';

class OverTimeAnalysis extends Component
{
  constructor() {
  super();

//THIS NEEDS MAJOR REFACTORING TO RE ORDER THESE METHODS TO A MOST OPTIMAL SOLUTION...

  this.state = {
    showMenu: false,
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
                      <button onClick={(e) => {e.preventDefault(); this.getResults(item);}}>
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
  getResults(item)
  {
      var snapshot;
      const databaseRef = firebase.database().ref("/");
      const trainerRef = databaseRef.child(item);

      console.log("databaseRef: " + databaseRef);
      console.log("trainerRef: " + trainerRef);

      trainerRef.on('value', function(snapshot){
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

            childChildSnapshot.forEach(function(childChildChildSnapshot){
              var childChildChildKey = childChildChildSnapshot.key;
              var childChildChildData = childChildChildSnapshot.val();

              console.log("Child child child key = " + childChildChildKey);
              console.log("Child child child Data = "+ childChildChildData);
            });
          });
        });
      });
      return 0;
  }

render()
  {
    var array = this.getCollections();
      return(
        <div>
          <h1>Over-Time Analysis</h1>
          <OverTimeText/>
          <SearchBar/>
          {this.dropdown(array)}
          <DecayRate/>
          <AveragePriceOverTime/>
        </div>
      );
  }

}

export default OverTimeAnalysis;
