import React from 'react';
import ReactDOM from 'react-dom';
import StorePopUp from '../components/StorePopUp';
import renderer from 'react-test-renderer'

it("StorePopUp Render",() => {
  const storePopUpComponent = renderer.create(
    <StorePopUp/>
  ).toJSON();
  expect(storePopUpComponent).toMatchSnapshot();
});
