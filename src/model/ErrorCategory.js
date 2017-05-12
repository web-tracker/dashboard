import { observable, computed } from 'mobx';
import axios from 'axios';
import Website from './Website';

export class Category {
  @observable path = [];
  @observable networkISP = [];
  @observable city = [];
  @observable browser = [];
  @observable device = [];

  @computed get website() {
    return Website.current;
  }

  constructor() { }

  load() {
    const apis = [
      'pathCategory',
      'ISPCategory',
      'cityCategory',
      'browserCategory',
      'deviceCategory'
    ];
    Promise.all(apis.map(api => {
      return this.fetch(`/api/error/${api}`);
    })).then(results => {
      const [path, isp, city, browser, device] = results;
      this.path = path.data;
      this.networkISP = isp.data;
      this.city = city.data;
      this.browser = browser.data;
      this.device = device.data;
    });
  }

  fetch(endpoint) {
    return axios.get(endpoint, { params: { hostname: this.website.hostname } });
  }
}

export default new Category();