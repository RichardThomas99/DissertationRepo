import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';

it("Main Nav Renders",()=>{
  const div = document.createElement("div");
  ReactDOM.render(<nav></nav>,div)
})
