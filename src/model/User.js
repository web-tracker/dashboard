import {observable, action} from 'mobx';
import axios from 'axios';

import config from '../config';

export default class User {
  @observable id;
  @observable username;
  @observable email;
  @observable avatar;

  // Flag to mark if User request has been requested
  @observable requested = false;

  constructor() {
    this.login();
  }

  login() {
    axios.get('/api/user').then(response => {
      const data = response.data;
      this.requested = true;
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.avatar = data.avatar;
    }).catch(error => {
      console.log('Fetch user failed');
    });
  }

  logout() {
    axios.get('/api/user/logout').then(response => {
      this.id = null;
      this.username = null;
      this.email = null;
      this.avatar = null;
      this.requested = false;
    }).catch(error => {
      console.log('Logout failed');
    });
  }
}