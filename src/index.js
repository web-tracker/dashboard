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
import MetricModel from './model/Metric';
import CategoryModel from './model/Category';

import './index.css';

const { Content, Footer, Sider } = Layout;

const RouterView = () => (
  <BrowserRouter>
    <Layout>
      <Route path="/" render={props => (
        <div>
          <Header user={User} location={props.location}/>
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
                style={{ height: '100%' }}
                selectedKeys={[props.location.pathname]}
              >
                <Menu.Item key="/dashboard/overview">
                  <NavLink to="/dashboard/overview">Overview</NavLink>
                </Menu.Item>
                <Menu.Item key="/dashboard/metric">
                  <NavLink to="/dashboard/metric">Metric Charts</NavLink>
                </Menu.Item>
                <Menu.Item key="/dashboard/errors">
                  <NavLink to="/dashboard/errors">Error Logs</NavLink>
                </Menu.Item>
                <Menu.Item key="/dashboard/monitor">
                  <NavLink to="/dashboard/monitor">Monitoring</NavLink>
                </Menu.Item>
                <Menu.Item key="/dashboard/setting">
                  <NavLink to="/dashboard/setting">Settings</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Route exact path="/dashboard" render={() => (
              <Redirect to="/dashboard/overview"/>
            )}/>
            <Route exact path="/dashboard/overview" render={() => (
              <Overview metric={MetricModel}/>
            )}/>
            <Route exact path="/dashboard/metric" render={() => (
              <Metric metric={MetricModel} category={CategoryModel}/>
            )}/>
            <Route exact path="/dashboard/errors" render={() => (
              <Errors category={CategoryModel}/>
            )}/>
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
