import React from 'react';
import { Layout, Row, Col, Input, Tag } from 'antd';
import ErrorStack from '../../component/ErrorStack';

export default class ErrorDetail extends React.Component {
  render() {
    const { state: error, errorModel } = this.props;
    return (
      <Layout.Content style={{ marginLeft: '24px', padding: '24px', minHeight: 280, background: '#fff' }}>
        <dl className="error-detail">
          <Row>
            <Col span="24">
              <dt>Message: </dt>
              <dd><strong style={{ color: 'red' }}>{error.message}</strong></dd>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <dt>Count: </dt>
              <dd>
                <Tag color="#f50">{error.count}</Tag>
              </dd>
            </Col>
            <Col span="12">
              <dt>Time: </dt>
              <dd><span>{error.time}</span></dd>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <dt>Script URL: </dt>
              <dd><span>{error.script_url}</span></dd>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <dt>Line: </dt>
              <dd>
                <Tag color="#2db7f5">{error.line}</Tag>
              </dd>
            </Col>
            <Col span="12">
              <dt>Column: </dt>
              <dd>
                <Tag color="#87d068">{error.column}</Tag>
              </dd>
            </Col>
          </Row>
          <Row>
            <dt>Stack: </dt>
            <dd>
              <ErrorStack stack={error.stack} errorModel={errorModel} />
            </dd>
          </Row>
        </dl>
      </Layout.Content>
    );
  }
}