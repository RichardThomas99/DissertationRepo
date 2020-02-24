import React, {Component} from 'react';
import'../App.css';

class SearchBar extends Component
{
  helloWorld()
  {
    console.log("helloWorld");
  }

render()
{
  return(
    <div class = "searchDiv">
      <form>
        <label>
          <input id = "textSearch"  type="text" name="product" />
        </label>
          <input type="submit" value="Search" />
          <button onClick = {(e) => {e.preventDefault(); this.helloWorld();}}>TheButton</button>
        </form>
      </div>
    );
}
}

export default SearchBar;
