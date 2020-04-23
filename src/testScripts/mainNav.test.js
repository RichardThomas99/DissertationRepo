import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/MainNav';
import renderer from 'react-test-renderer'

it("Main Nav Render",() => {
  const mainNavComponent = renderer.create(
    <Nav/>
  ).toJSON();
  expect(mainNavComponent).toMatchSnapshot();
});
