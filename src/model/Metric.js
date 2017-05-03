import {observable} from 'mobx';
import axios from 'axios';

export default new class Metric {
  @observable averageLoadingTimeOverhead = 0;
  @observable averageFirstPaintTimeOverhead = 0;
  @observable metricTimeOverview = [];

  constructor() {
    this._averageLoadingTimeOverhead();
    this._averageFirstPaintTimeOverhead();
    this._timeOverview();
  }

  _averageLoadingTimeOverhead() {
    axios.get('/api/metric/averageLoadingTimeOverhead').then(resp => {
      this.averageLoadingTimeOverhead = parseFloat(resp.data['averageLoadingTimeOverhead']);
    });
  }

  _averageFirstPaintTimeOverhead() {
    axios.get('/api/metric/averageFirstPaintTimeOverhead').then(resp => {
      this.averageFirstPaintTimeOverhead = parseFloat(resp.data['averageFirstPaintTimeOverhead']);
    });
  }

  _timeOverview() {
    axios.get('/api/metric/historyMetricOverview/30').then(({data: overview}) => {
      console.log('overview fetched');
      this.metricTimeOverview = overview;
    });
  }
}