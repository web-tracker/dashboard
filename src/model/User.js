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
    const url = '/api/user';
    axios.get(url).then(response => {
      const data = response.data;
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.avatar = data.avatar;
    });
  }
}