import React from 'react';
import ReactDOM from 'react-dom';
import PriceDistributionGraph from '../components/PriceDistributionGraph';
import renderer from 'react-test-renderer'

it("PriceDistributionGraph Render",() => {
  const priceDistributionGraph = renderer.create(
    <PriceDistributionGraph/>
  ).toJSON();
  expect(PriceDistributionGraph).toMatchSnapshot();
});
