import React from 'react';
import {
  Layout, Form, Input, InputNumber, Switch, Row, Col,
  Button, Card, Modal
} from 'antd';
import { observer } from 'mobx-react';

const { Content } = Layout;

@observer
export default class Setting extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showModal: false
    }
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  render() {
    const { website } = this.props;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 8 },
    };
    const siteFormItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };

    const modal = (
      <Modal
        width={500}
        visible={this.state.showModal}
        closable={false}
        maskClosable={true}
        onCancel={this.closeModal}
      >
        <div style={{ marginTop: '20px' }}>
          <Form.Item
            label="Name"
            {...siteFormItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Host Name"
            {...siteFormItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Token"
            {...siteFormItemLayout}
          >
            <Input />
          </Form.Item>
        </div>
      </Modal>
    );
    return (
      <Content style={{ padding: '24px', minHeight: 280, marginTop: '-20px' }} ref="container">
        <Card title="Website Setting" bordered={false}>
          <Form.Item
            label="Name"
            {...siteFormItemLayout}
          >
            <Input value={website.current.name}
              onChange={(e) => {
                website.current.name = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Host Name"
            {...siteFormItemLayout}
          >
            <Input value={website.current.hostname}
              onChange={(e) => {
                website.current.hostname = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Token"
            {...siteFormItemLayout}
          >
            <Input value={website.current.token}
              onChange={(e) => {
                website.current.token = e.target.value;
              }}
            />
          </Form.Item>
          <Row>
            <Col span="10" push={2}>
              <Form.Item
                label="Enable Metric Alert"
                {...formItemLayout}
              >
                <Switch checked={website.current.metric_alert_enabled}
                  onChange={() => {
                    website.current.metric_alert_enabled = !website.current.metric_alert_enabled
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Metric Alert Line"
                {...formItemLayout}
              >
                <InputNumber
                  value={website.current.metric_alert_line}
                  onChange={(val) => {
                    website.current.metric_alert_line = val;
                  }}
                />
              </Form.Item>
            </Col>
            <Col span="10" push={4}>
              <Form.Item
                label="Enable Error Alert"
                {...formItemLayout}
              >
                <Switch checked={website.current.error_alert_enabled}
                  onChange={() => {
                    website.current.error_alert_enabled = !website.current.error_alert_enabled
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Error Alert Line"
                {...formItemLayout}
              >
                <InputNumber
                  value={website.current.error_alert_line}
                  onChange={(val) => {
                    website.current.error_alert_line = val;
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ textAlign: 'center' }}>
            <Button type="default" onClick={() => website.updateWebsite()}>
              Update
            </Button>
            <Button type="danger" style={{ marginLeft: '10px' }}>
              Remove
            </Button>
            <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.openModal}>
              Create
            </Button>
          </Row>
          {modal}
        </Card>
      </Content >
    )
  }
}