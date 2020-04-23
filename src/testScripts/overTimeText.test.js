import React from 'react';
import ReactDOM from 'react-dom';
import OverTimeText from '../components/OverTimeText';

import renderer from 'react-test-renderer'

it("OverTimeText Render",() => {
  const overTimeTextComponent = renderer.create(
    <OverTimeText/>
  ).toJSON();
  expect(overTimeTextComponent).toMatchSnapshot();
});
