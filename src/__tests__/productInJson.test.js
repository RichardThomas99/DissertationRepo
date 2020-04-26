import React from 'react';
import ReactDOM from 'react-dom';
import ProductInJson from '../components/productInJson';
import renderer from 'react-test-renderer'

it("productInJsonComponent Render",() => {
  const productInJsonComponent = renderer.create(
    <ProductInJson/>
  ).toJSON();
  expect(productInJsonComponent).toMatchSnapshot();
});
