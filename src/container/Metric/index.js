import React, {Component} from 'react';
import {
  Layout, Col, Row, Form, DatePicker, Radio, Select,
  Button, Tabs, Input, Icon, Table
} from 'antd';
import {observer} from 'mobx-react';
import TimeOverview from '../../component/TimeOverview';
import TimeBarchart from '../../component/TimeBarchart';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const Search = Input.Search;

const dataSource = [];

for (let i = 0; i< 100; i++) {
  dataSource.push(
    {
  key: i,
  name: '胡彦祖' + i,
  age: 42,
  address: '西湖区湖底公园1号'
}
  )
}

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

@observer
export default class Metric extends Component {
  render() {
    const {metric} = this.props;
    const networkISPView = ['China Education', 'Dianxin', 'Mobile', 'Liantong'].map((isp, index) => (
      <Select.Option key={isp}>{isp}</Select.Option>
    ));
    const chartView = (
      <Row>
          <Row>
              <Col span="10">
                  <RangePicker format="YYYY-MM-DD" size="large" onChange={this.onDateChange}/>
              </Col>
              <Col span="12">
                  <RadioGroup value={1} style={{marginTop: '5px'}}>
                    <Radio value={1}>ISP</Radio>
                    <Radio value={2}>City</Radio>
                    <Radio value={3}>Browser</Radio>
                    <Radio value={4}>Device</Radio>
                  </RadioGroup>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col span="4">
                <Select
                  size='large'
                  placeholder="Path"
                  style={{ width: 130 }}
                  allowClear={true}
                >
                  {networkISPView}
                </Select>
              </Col>
              <Col span="4">
                <Select
                  size='large'
                  placeholder="Network ISP"
                  style={{ width: 130 }}
                  allowClear={true}
                >
                  {networkISPView}
                </Select>
              </Col>
              <Col span="4">
                <Select
                  size='large'
                  placeholder="City"
                  style={{ width: 130 }}
                  allowClear={true}
                >
                  {networkISPView}
                </Select>
              </Col>
              <Col span="4">
                <Select
                  size='large'
                  placeholder="Browser"
                  style={{ width: 130 }}
                  allowClear={true}
                >
                  {networkISPView}
                </Select>
              </Col>
              <Col span="4">
                <Select
                  size='large'
                  placeholder="Device"
                  style={{ width: 130 }}
                  allowClear={true}
                >
                  {networkISPView}
                </Select>
              </Col>
              <Col span="4">
                <Button type="primary" icon="search" size="large">Search</Button>
              </Col>
            </Row>
            <Row>
              <TimeOverview metric={metric}/>
            </Row>
            <Row>
              <TimeBarchart />
            </Row>
      </Row>
    );
    return (
      <Layout.Content style={{ marginLeft: '24px', padding: '24px', minHeight: 280, background: '#fff' }} ref="container">
        <Row>
          <Tabs type="card">
            <TabPane tab="Overview" key="1"></TabPane>
            <TabPane tab="First Paint Time" key="2"></TabPane>
            <TabPane tab="First Interaction Time" key="3"></TabPane>
            <TabPane tab="Total Loading Time" key="4"></TabPane>
            <TabPane tab="DNS Time" key="6"></TabPane>
            <TabPane tab="Assets Time" key="7"></TabPane>
          </Tabs>
          {chartView}
        </Row>
        <Row style={{marginTop: '15px'}}>
          {/*<Table size="middle" dataSource={dataSource} columns={columns} />*/}
        </Row>
      </Layout.Content>
    );
  }
}