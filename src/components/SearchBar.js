import React from 'react';
import'../App.css';

function SearchBar()
{

  return(
    <div class = "searchDiv">
      <form>
        <label>
          <input id = "textSearch"  type="text" name="product" />
        </label>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
}

export default SearchBar;
