import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';

it("navComponent Render",() => {
  const navComponent = renderer.create(
    <Router>
    <Nav/>
    </Router>
  ).toJSON();
  expect(navComponent).toMatchSnapshot();
});
