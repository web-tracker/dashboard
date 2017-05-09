import { observable } from 'mobx';
import axios from 'axios';

export default new class Website {
  @observable websites = [];
  @observable current = {};
  @observable backup = null;

  constructor() {
    this.getWebsites();
  }

  selectWebsite(hostname) {
    const current = this.websites.filter(w => w.hostname === hostname)[0];
    current.metric_alert_enabled = !!current.metric_alert_enabled;
    current.error_alert_enabled = !!current.error_alert_enabled;
    this.current = current;
    // For rollback
    this.backup = current;
  }

  /**
   * Update website object in setting page,
   * otherwise rollback to backup object.
   */
  updateWebsite() {
    console.log(this.current);
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