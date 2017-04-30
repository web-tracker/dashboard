import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

class Home extends Component {
  render() {
    return (
      <Content style={{ padding: '24px', minHeight: 280 }} ref="container">
        home page
      </Content>
    );
  }
}

export default Home;