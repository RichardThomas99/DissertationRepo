import React, {Component} from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class LineGraph extends Component
{

graph()
{
  const data = [
  {
    "name": "£0 - £10",
    "uv": 7,
    "amt": 2400
  },
  {
    "name": "£0 - £10",
    "uv": 3,
    "amt": 2210
  },
  {
    "name": "£0 - £10",
    "uv": 2,
    "amt": 2290
  },
  {
    "name": "£0 - £10",
    "uv": 6,
    "amt": 2000
  },
  {
    "name": "£0 - £10",
    "uv": 8,
    "amt": 2181
  },
  {
    "name": "£0 - £10",
    "uv": 9,
    "amt": 2500
  },
  {
    "name": "£0 - £10",
    "uv": 4,
    "amt": 2100
  }
]

  const renderBarChart = (

    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  );

    return renderBarChart;

}

    render()
    {

      return (
        <div>

        <h3>Line Graph Test</h3>
        {this.graph()}
        </div>
      );
    }
}

export default LineGraph;
