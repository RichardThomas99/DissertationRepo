import React from 'react';
import'../App.css';
import {Link} from 'react-router-dom';

/**
 * A ReactJS class which provides the top Navigation bar for the software
 * @example
 * return (
 *     <nav data-testid = "navigation">
 *
 *     <h1>RESELLER COMPANION APP</h1>
 *     <ul className = "nav-links">
 *
 *     <Link style = {navStyle} to= "/Settings">
 *     <li>Settings</li>
 *     </Link>
 *     </ul>
 *     </nav>
 * )
 */
function Nav()
{
  const navStyle =
  {
    color:'black'
  };

  return(
    <nav data-testid = "navigation">
    <h1>RESELLER COMPANION APP</h1>
    <ul className = "nav-links">

    <Link style = {navStyle} to= "/Settings">
      <li>Settings</li>
    </Link>
    </ul>
    </nav>
  );
}

export default Nav;
