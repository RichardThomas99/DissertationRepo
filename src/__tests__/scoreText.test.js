import React from 'react';
import ReactDOM from 'react-dom';
import ScoreText from '../components/ScoreText';
import renderer from 'react-test-renderer'

it("ScoreText Render",() => {
  const scoreTextComponent = renderer.create(
    <ScoreText/>
  ).toJSON();
  expect(scoreTextComponent).toMatchSnapshot();
});
