import {observable, action} from 'mobx';
import axios from 'axios';

import config from '../config';

export default class User {
  @observable id;
  @observable username;
  @observable email;
  @observable avatar;

  constructor() {
    this.fetch();
  }

  fetch() {
    const url = '/user';
    console.log(url);
    axios.get(url).then(response => {
      console.log(response);
    });
  }
}