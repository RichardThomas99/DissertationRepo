import React, {Component} from 'react';
import'../App.css';

class SearchBar extends Component
{
  clicked()
  {
    var searchTerm = document.getElementById("textSearch").value;
    console.log("Search Term: " + searchTerm);
  }

render()
{
  return(
    <div class = "searchDiv">
      <form>
        <label>
          <input id = "textSearch"  type="text" name="product" placeholder ="Search a Product..." />
        </label>
          <button onClick = {(e) => {e.preventDefault(); this.clicked();}}> Submit </button>
        </form>
      </div>
    );
}
}

export default SearchBar;
