import React, {Component} from 'react';
import TimeAreaChart from '../TimeAreaChart';

export default class SyncAreaChart extends Component {
  render() {
    const {data, syncId} = this.props;
    const map = new Map();
    
    return (
      <div>
        {
          data.map((d, index) => (
            <TimeAreaChart data={d.slice()} syncId={syncId} key={index}/>
          ))
        }
      </div>
    );
  }
}