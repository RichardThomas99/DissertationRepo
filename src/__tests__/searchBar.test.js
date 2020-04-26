import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../components/SearchBar';
import renderer from 'react-test-renderer'

it("SearchBar Render",() => {
  const searchBarComponent = renderer.create(
    <SearchBar/>
  ).toJSON();
  expect(searchBarComponent).toMatchSnapshot();
});
