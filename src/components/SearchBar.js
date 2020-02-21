import React from 'react';
import'../App.css';

function SearchBar()
{

  return(
    <form>
    <label>
      <input id = "textSearch"  type="text" name="product" />
      </label>
      <input type="submit" value="Search" />

      </form>
    );
}

export default SearchBar;
