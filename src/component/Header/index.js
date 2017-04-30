import React, {Component} from 'react';
import {
  NavLink
} from 'react-router-dom'
import { Layout, Menu, Button, Row, Col } from 'antd';
import { observer } from 'mobx-react';
const { Header, Content, Footer, Sider } = Layout;
import './index.css';
import config from '../../config';

@observer
class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    location.href = config.host + '/login?redirect_url=' + location.href;
  }

  logout() {
    this.props.user.logout();
  }

  render() {
    const {user} = this.props;
    return (
      <Header className="header">
        <Row>
          <Col span={5}>
            <div className="logo">
            </div>
          </Col>
          <Col span={16}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px'}}
            >
              <Menu.Item key="1">
                <NavLink to="/home" activeClassName="selected">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/guide" activeClassName="selected">Guide</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/dashboard" activeClassName="selected">Dashboard</NavLink>
              </Menu.Item>
              <Menu.Item key="4">
                <NavLink to="/setting" activeClassName="selected">Setting</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2} push={1}>
            {
              user.requested && user.id
              ? (<img src={this.props.user.avatar} style={{width: '40px', borderRadius: '50%', marginTop: '12px'}}
                  onClick={this.logout}/>)
              : (<Button type="primary" onClick={this.login}>Login</Button>)
            }
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderView;