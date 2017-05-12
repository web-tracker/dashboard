import { observable, computed } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import Website from './Website';

export class Alert {
  @observable alertStats = [];
  @observable rawAlertStats = [];
  @computed get website() {
    return Website.current;
  }

  loadAlertStats() {
    axios.get('/api/alert/getTodaysAlertStats', {
      params: { hostname: this.website.hostname }
    }).then(resp => {
      const data = resp.data;
      this.rawAlertStats = data;

      const results = [];
      const d = moment(moment().format('YYYY-MM-DD') + ' 00:00');
      const types = data.map(d => d.type);

      setTimeout(() => {
        while (d.isBefore(Date.now())) {
          let obj = {
            time: d.format('YYYY-MM-DD HH:mm')
          };
          obj = types.reduce((prev, curr) => {
            prev[curr] = 0;
            return prev;
          }, obj);
          results.push(obj);
          d.add(1, 'minute');
        }

        let index = 0, resolvedIndex = 0, obj = null;
        for (const d of data) {
          // Get exist data and replace it
          index = results.findIndex(ele => ele.time === d.time);

          if (!!d.resolved) {
            resolvedIndex = results.findIndex(ele => ele.time === d.resolved_time);
          }
          // Replace all element after this point
          // Because it's not fixed yet
          const end = !!d.resolved ? resolvedIndex : results.length;
          for (let i = index; i < end; i++) {
            obj = results[i];
            if (obj) obj[d['type']] = d['count'];
            obj = null;
          }
          resolvedIndex = 0;
        }
        this.alertStats = results;
      }, 50);
    });
  }
}

export default new Alert();