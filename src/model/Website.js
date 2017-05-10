import * as mobx from 'mobx';
import { observable } from 'mobx';
import axios from 'axios';

export default new class Website {
  @observable websites = [];
  @observable current = {};
  @observable backup = {};

  constructor() {
    this.getWebsites();
  }

  selectWebsite(hostname) {
    const current = this.websites.filter(w => w.hostname === hostname)[0];
    current.metric_alert_enabled = !!current.metric_alert_enabled;
    current.error_alert_enabled = !!current.error_alert_enabled;
    this.current = current;
    // For rollback
    this.nextState();
  }

  /**
   * Update website object in setting page,
   * otherwise rollback to backup object.
   * @return Promise
   */
  updateWebsite() {
    return axios.post('/api/website/updateWebsite', this.current).then(resp => {
      this.nextState();
      return resp;
    }).catch(error => {
      console.log('error', error);
      this.rollback();
      throw error;
    });
  }

  createWebsite(website) {
    return axios.post('/api/website/createWebsite', website).then(resp => {
      this.websites.push(resp.data);
      return resp;
    });
  }

  removeWebsite() {
    return axios.delete('/api/website/removeWebsite', {
      params: { id: this.current.id }
    });
  }

  rollback() {
    this.current = Object.assign({}, this.backup);
  }

  nextState() {
    this.backup = Object.assign({}, this.current);
  }

  getWebsites() {
    axios.get('/api/website/getWebsiteList')
      .then(resp => {
        this.websites = resp.data;
        // Select first website by default
        this.selectWebsite(resp.data[0].hostname);
      });
  }
}