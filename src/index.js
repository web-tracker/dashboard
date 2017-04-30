import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import Header from './component/Header';
import Home from './container/Home';
import Overview from './container/Overview';
import Metric from './container/Metric';
import Errors from './container/Errors';
import Monitor from './container/Monitor';
import Setting from './container/Setting';
import User from './model/User';
import './index.css';

const { Content, Footer, Sider } = Layout;
const user = new User();

const RouterView = () => (
  <BrowserRouter>
    <Layout>
      <Route path="/" render={props => (
        <div>
          <Header user={user}/>
          <Route path="/home" component={Home}/>
          {/*<Route path="/dashboard" component={Dashboard}/>*/}
        </div>
      )}/>
      <Route path="/dashboard" render={props => ( 
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">
                  <NavLink to="/dashboard/overview" activeClassName="ant-menu-item-selected">Overview</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/dashboard/metric" activeClassName="ant-menu-item-selected">Metric</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/dashboard/errors" activeClassName="ant-menu-item-selected">Errors</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/dashboard/monitor" activeClassName="ant-menu-item-selected">Monitor</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                  <NavLink to="/dashboard/setting" activeClassName="ant-menu-item-selected">Setting</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Route exact path="/dashboard" render={() => (
              <Redirect to="/dashboard/overview"/>
            )}/>
            <Route exact path="/dashboard/overview" component={Overview}/>
            <Route exact path="/dashboard/metric" component={Metric}/>
            <Route exact path="/dashboard/errors" component={Errors}/>
            <Route exact path="/dashboard/monitor" component={Monitor}/>
            <Route exact path="/dashboard/setting" component={Setting}/>
          </Layout>
        </Content>
      )}/>
      <Footer style={{ textAlign: 'center' }}>
        Web Tracker © 2017
      </Footer>
    </Layout>
  </BrowserRouter>
);

ReactDOM.render(
  <RouterView />,
  document.getElementById('root')
);
