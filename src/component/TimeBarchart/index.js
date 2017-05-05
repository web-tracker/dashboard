import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

@observer
export default class TimeBarchart extends Component {
  render() {
    const { metric, syncId } = this.props;
    const data = metric.metricQueriedData.slice();
    const set = new Set();
    for (const d of data) {
      const keys = Object.keys(d);
      for (const key of keys) {
        if (key !== 'time') {
          set.add(key);
        }
      }
    }
    const barListView = Array.from(set.values()).map((metric) => (
      <Bar dataKey={metric} fill={COLORS[parseInt(Math.random() * COLORS.length) % COLORS.length]} key={metric} />
    ));
    return (
      <div>
        <BarChart width={830} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}} syncId={syncId}>
          <XAxis dataKey="time"/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          { barListView }
          <Brush dataKey='time' height={30} stroke="#b9b9b9"/>
        </BarChart>
      </div>
    );
  }
}