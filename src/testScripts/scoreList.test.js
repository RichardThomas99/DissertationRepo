import React from 'react';
import ReactDOM from 'react-dom';
import ScoreList from '../components/ScoreList';
import renderer from 'react-test-renderer'

it("ScoreList Render",() => {
  const scoreListComponent = renderer.create(
    <ScoreList/>
  ).toJSON();
  expect(scoreListComponent).toMatchSnapshot();
});
