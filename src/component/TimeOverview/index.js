import React, {Component} from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Brush, Legend
} from 'recharts';
import {observer} from 'mobx-react';

@observer
export default class TimeOverview extends Component {
  render() {
    const {metric} = this.props;
    return (
      <AreaChart width={830} height={200} data={metric.metricTimeOverview.slice()}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="name"/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='first_paint_time' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey='first_interaction_time' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
        <Area type='monotone' dataKey='total_loading_time' stackId="1" stroke='#ffc658' fill='#ffc658' />
        <Legend />
        <Brush dataKey='name' height={30} stroke="#b9b9b9"/>
      </AreaChart>
    );
  }
}