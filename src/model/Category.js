import {observable} from 'mobx';
import axios from 'axios';

export default new class Category {
  @observable path;
  @observable networkISP;
  @observable city;
  @observable browser;
  @observable device;

  constructor() {
    this.load();
  }

  load() {
    const apis = [
      'pathCategory',
      'ISPCategory',
      'cityCategory',
      'browserCategory',
      'deviceCategory'
    ];
    Promise.all(apis.map(api => {
      return this.fetch(`/api/metric/${api}`);
    })).then(results => {
      console.log(results);
    });
  }

  fetch(endpoint) {
    return axios.get(endpoint);
  }
}