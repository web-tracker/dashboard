import { observable } from 'mobx';
import moment from 'moment';
import axios from 'axios';

const format = 'MM-DD HH:mm';
export default new class Error {
  @observable queryErrors = [];

  getQueryData(options) {
    axios.get('/api/error/queryErrors', {
      params: options
    }).then(resp => {
      const errors = resp.data;
      for (const error of errors) {
        error.time = moment(error.time).format(format);
        // Used in antd table row
        error.key = error.message;
      }
      this.queryErrors = errors;
    })
  }
}