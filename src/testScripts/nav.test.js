import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import renderer from 'react-test-renderer'

it("navComponent Render",() => {
  const navComponent = renderer.create(
    <Nav/>
  ).toJSON();
  expect(navComponent).toMatchSnapshot();
});
