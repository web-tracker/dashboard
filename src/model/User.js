import {observable} from 'mobx';
import axios from 'axios';

export default new class User {
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
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.avatar = data.avatar;
      this.requested = true;
    }).catch(error => {
      this.requested = true;
      console.log('Fetch user failed');
    });
  }

  logout() {
    axios.get('/api/user/logout').then(response => {
      this.id = null;
      this.username = null;
      this.email = null;
      this.avatar = null;
    }).catch(error => {
      console.log('Logout failed');
    });
  }
}