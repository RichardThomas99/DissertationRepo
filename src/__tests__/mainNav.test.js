import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/MainNav';
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';

it("Main Nav Render",() => {
  const mainNavComponent = renderer.create(
    <Router>
    <Nav/>
    </Router>
  ).toJSON();
  expect(mainNavComponent).toMatchSnapshot();
});
