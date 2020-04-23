import React from 'react';
import ReactDOM from 'react-dom';
import DecayRate from '../components/DecayRate';
import renderer from 'react-test-renderer'

it("DecayRate Render",() => {
  const decayRateComponent = renderer.create(
    <DecayRate/>
  ).toJSON();
  expect(decayRateComponent).toMatchSnapshot();
});
