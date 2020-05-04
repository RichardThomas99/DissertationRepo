import React from 'react';
import'../App.css';
import {Link} from 'react-router-dom';


/**
 * A ReactJS class which provides the Main Navigation bar for the software
 * @example
 * return (
 *     <nav data-testid = "navigation">
 *      <nav data-testid = "navigation" className = "navMain">
 *        <ul className = "mainNav-links">
 *     <Link style = {mainNavStyle} to= "/TopListings">
 *       <li>Top Listings</li>
 *     </Link>
 *     <Link style = {mainNavStyle} to= "/RealTimeAnalysis">
 *       <li>Real-Time Analysis</li>
 *     </Link>
 *     <Link style = {mainNavStyle} to= "/OverTimeAnalysis">
 *        <li>Over-Time Analysis</li>
 *     </Link>
 *   </ul>
 * </nav>
 * )
 */
function MainNav()
{

  //Setting the style component of the nav Bar
  const mainNavStyle =
  {
    color:'white'
  };

  return(
    <nav data-testid = "navigation" className = "navMain">
      <ul className = "mainNav-links">
        <Link style = {mainNavStyle} to= "/TopListings">
          <li>Top Listings</li>
        </Link>
        <Link style = {mainNavStyle} to= "/RealTimeAnalysis">
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
