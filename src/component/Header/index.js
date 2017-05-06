import React, {Component} from 'react';
import {
  NavLink
} from 'react-router-dom'
import { Layout, Menu, Button, Row, Col, Tooltip} from 'antd';
import { observer } from 'mobx-react';
const { Header, Content, Footer, Sider } = Layout;
import './index.css';
import config from '../../config';

@observer
class HeaderView extends Component {
  constructor(props) {
    super(props);
  }

  login = () => {
    location.href = config.host + '/login?redirect_url=' + location.href;
  }

  logout = () => {
    this.props.user.logout();
  }

  render() {
    const {user, location} = this.props;
    console.log(location);
    const rootpath = location.pathname.split('/');
    if (!rootpath || rootpath.length < 2) {
      throw new Error('Router Error');
    }
    const selectedMenu = '/' + rootpath[1];
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
              selectedKeys={[selectedMenu]}
              style={{marginTop: '10px'}}
            >
              <Menu.Item key="/home">
                <NavLink to="/home">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="/guide">
                <NavLink to="/guide">Guide</NavLink>
              </Menu.Item>
              <Menu.Item key="/dashboard">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </Menu.Item>
              <Menu.Item key="/setting">
                <NavLink to="/setting">Setting</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2} push={1} style={{maxHeight: '64px', overflow: 'hidden'}}>
              {
                !user.requested ? (<span></span>)
                : (user.id
                ? (<Tooltip placement="bottom" title="Logout">
                    <img src={this.props.user.avatar}
                      style={{width: '40px', borderRadius: '50%', marginTop: '12px'}}
                      onClick={this.logout}
                    />
                  </Tooltip>)
                : (<Button type="primary" onClick={this.login}>Login</Button>))
              }
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderView;