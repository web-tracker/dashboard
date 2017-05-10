import { observable, computed } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import Website from './Website';

export default new class Metric {
  @observable averageLoadingTimeOverhead = 0;
  @observable averageFirstPaintTimeOverhead = 0;
  @observable metricTimeOverview = [];
  @observable metricQueriedData = [];
  @observable metricSegmentQueriedData = [];

  @computed get website() {
    return Website.current;
  }

  constructor() { }

  _averageLoadingTimeOverhead() {
    axios.get('/api/metric/averageLoadingTimeOverhead', {
      params: { hostname: this.website.hostname }
    }).then(resp => {
      this.averageLoadingTimeOverhead = parseFloat(resp.data['averageLoadingTimeOverhead']);
    });
  }

  _averageFirstPaintTimeOverhead() {
    axios.get('/api/metric/averageFirstPaintTimeOverhead', {
      params: { hostname: this.website.hostname }
    }).then(resp => {
      this.averageFirstPaintTimeOverhead = parseFloat(resp.data['averageFirstPaintTimeOverhead']);
    });
  }

  _timeOverview() {
    axios.get('/api/metric/historyMetricOverview/30', {
      params: { hostname: this.website.hostname }
    }).then(({ data: overview }) => {
      console.log('overview fetched');
      this.metricTimeOverview = overview;
    });
  }

  getMetricData(options) {
    console.log('options received', options);
    if (!options.key) {
      options.key = 'first_paint_time';
      options.dimension = 'network_isp';
    }
    const map = new Map();
    const segMap = new Map();
    axios.get('/api/metric/queryMetric', {
      params: Object.assign(options, {
        hostname: this.website.hostname
      })
    }).then(resp => {
      const results = resp.data;
      // Process data into the format we want
      for (const result of results) {
        if (!map.has(result.time)) {
          map.set(result.time, { time: result.time });
        }
        const item = map.get(result.time);
        item[result[options.dimension]] = result[options.key];
      }
      this.metricQueriedData = Array.from(map.values());

      for (const result of results) {
        if (!segMap.has(result[options.dimension])) {
          segMap.set(result[options.dimension], []);
        }
        const item = segMap.get(result[options.dimension]);
        let time;
        if (options.interval === 'day') {
          time = moment(result.time).format('MM-DD');
        } else if (options.interval === 'hour') {
          time = moment(result.time).format('HH');
        } else if (options.interval === 'minute') {
          time = moment(result.time).format('HH:mm');
        }
        item.push({
          [result[options.dimension]]: result[options.key],
          time: time
        });
      }
      this.metricSegmentQueriedData = Array.from(segMap.values());
    });
  }

  resetQuery() {
    this.metricQueriedData = [];
  }

  resetSegmentQuery() {
    this.metricSegmentQueriedData = [];
  }
}