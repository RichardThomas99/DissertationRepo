import React from 'react';
import'../App.css';
import {Link} from 'react-router-dom';

function MainNav()
{
  const mainNavStyle =
  {
    color:'white'
  };

  return(
    <nav className = "navMain">
      <ul className = "mainNav-links">
        <Link style = {mainNavStyle} to= "/TopListings">
          <li>Top Listings</li>
        </Link>
        <Link style = {mainNavStyle} to= "/DataSets">
          <li>Real-Time Analysis</li>
        </Link>
        <Link style = {mainNavStyle} to= "/OverTimeAnalysis">
          <li>Over-Time Analysis</li>
        </Link>
      </ul>
    </nav>
  );
}

export default MainNav;
