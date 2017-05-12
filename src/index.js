import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Redirect, NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import Header from './component/Header';
import Home from './container/Home';
import Overview from './container/Overview';
import Metric from './container/Metric';
import Errors from './container/Errors';
import Alert from './container/Alert';
import Monitor from './container/Monitor';
import Setting from './container/Setting';
import ErrorDetail from './container/ErrorDetail';
import User from './model/User';
import MetricModel from './model/Metric';
import ErrorModel from './model/Error';
import CategoryModel from './model/Category';
import ErrorCategoryModel from './model/ErrorCategory';
import WebsiteModel from './model/Website';
import AlertModel from './model/Alert';

import './index.css';
const { Content, Footer, Sider } = Layout;

const loginStyles = {
  position: 'absolute',
  zIndex: '100',
  bacgkround: '#000',
  top: '64px',
  width: '100%',
  height: 'calc(100vh - 64px)',
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  textAlign: 'center',
}
const LoginHintView = () => (
  <div style={loginStyles}>
    <h2 style={{ marginTop: '200px' }}>You need to login before using the dashboard!</h2>
  </div>
);

@observer
class RouterView extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          {
            !User.requested ? (<span></span>)
              : (User.id
                ? (<span></span>)
                : (<LoginHintView />))
          }
          <Route path="/" render={props => (
            <div>
              <Header user={User} location={props.location} website={WebsiteModel} />
              <Route path="/home" component={Home} />
              {/*<Route path="/dashboard" component={Dashboard}/>*/}
            </div>
          )} />
          <Route path="/dashboard" render={props => (
            < Content style={{ padding: '0 50px' }}>
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
                    {/*<Menu.Item key="/dashboard/monitor">
                  <NavLink to="/dashboard/monitor">Monitoring</NavLink>
                </Menu.Item>*/}
                    <Menu.Item key="/dashboard/alert">
                      <NavLink to="/dashboard/alert">Alert Center</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/setting">
                      <NavLink to="/dashboard/setting">Settings</NavLink>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Route exact path="/dashboard" render={() => (
                  <Redirect to="/dashboard/overview" />
                )} />
                <Route exact path="/dashboard/overview" render={() => (
                  <Overview metric={MetricModel} />
                )} />
                <Route exact path="/dashboard/metric" render={() => (
                  <Metric metric={MetricModel} category={CategoryModel} />
                )} />
                <Route exact path="/dashboard/errors" render={() => (
                  <Errors category={ErrorCategoryModel} error={ErrorModel} />
                )} />
                <Route exact path="/dashboard/errors/detail" render={({ location }) => (
                  <ErrorDetail errorModel={ErrorModel} state={location.state} />
                )} />
                <Route exact path="/dashboard/monitor" component={Monitor} />
                <Route exact path="/dashboard/alert" render={() => (
                  <Alert alert={AlertModel} />
                )} />
                <Route exact path="/dashboard/setting" render={() => (
                  <Setting website={WebsiteModel} />
                )} />
              </Layout>
            </Content>
          )} />
          <Footer style={{ textAlign: 'center' }}>
            Web Tracker © 2017
      </Footer>
        </Layout>
      </BrowserRouter >
    );
  }
};

ReactDOM.render(
  <RouterView />,
  document.getElementById('root')
);
