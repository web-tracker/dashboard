import { observable, computed } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import * as Prism from 'prismjs';
import Website from './Website';

const format = 'YYYY-MM-DD HH:mm';
class Error {
  @observable queryErrors = [];
  @observable sourceCode = '';

  @computed get website() {
    return Website.current;
  }

  getQueryData(options) {
    axios.get('/api/error/queryErrors', {
      params: Object.assign(options || {}, {
        hostname: this.website.hostname
      })
    }).then(resp => {
      const errors = resp.data;
      errors.forEach((error, index) => {
        error.time = moment(error.time).format(format);
        // Used in antd table row
        error.key = error.message + error.script_url;
        error.index = index;
      });
      this.queryErrors = errors;
    });
  }

  getSourceCode(url) {
    axios.get('/api/error/fetchSourceCode', {
      params: { url, hostname: this.website.hostname }
    }).then(resp => {
      this.sourceCode = resp.data.sourceCode;
    }).catch(() => {
      this.sourceCode = '';
    })
  }
}

export default new Error();