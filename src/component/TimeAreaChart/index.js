import React, {Component} from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Brush, Legend
} from 'recharts';
import {observer} from 'mobx-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

@observer
export default class TimeAreaChart extends Component {
  render() {
    const {data, syncId, width, height} = this.props;
    const set = new Set();
    for (const d of data) {
      const keys = Object.keys(d);
      for (const key of keys) {
        if (key !== 'time') {
          set.add(key);
        }
      }
    }
    const areaListView = Array.from(set.values()).map(metric => (
      <Area type='monotone' dataKey={metric} stackId="1" stroke='#8884d8' fill={COLORS[parseInt(Math.random() * COLORS.length) % COLORS.length]} key={metric}/>
    ));
    return (
      <AreaChart width={width || 830} height={height || 200} data={data}
          margin={{top: 10, right: 30, left: 0, bottom: 0}} syncId={syncId}>
        <XAxis dataKey="time"/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        { areaListView }
        <Legend />
        <Brush dataKey='time' height={30} stroke="#b9b9b9"/>
      </AreaChart>
    );
  }
}