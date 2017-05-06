import React, {Component} from 'react';
import moment from 'moment';
import {
  Layout, DatePicker, Tabs, Row, Col, Form, Radio, Select,
  Button, Input, Icon, Table
} from 'antd';
import {observer} from 'mobx-react';

const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.RadioGroup;

@observer
export default class Errors extends Component {
  render() {
    const {category} = this.props;
    const pathOptionView = category.path.slice().map(path => (
      <Select.Option key={path.page_url}>{path.page_url}</Select.Option>
    ));
    const ispOptionView = category.networkISP.slice().map(isp => (
      <Select.Option key={isp.network_isp}>{isp.network_isp}</Select.Option>
    ));
    const cityOptionView = category.city.slice().map(c => (
      <Select.Option key={c.city}>{c.city}</Select.Option>
    ));
    const browserOptionView = category.browser.slice().map(b => (
      <Select.Option key={b.browser}>{b.browser}</Select.Option>
    ));
    const deviceOptionView = category.device.slice().map(d => (
      <Select.Option key={d.device}>{d.device}</Select.Option>
    ));
    const exceptionView = (
      <div>
        <Row>
          <RangePicker format="YYYY-MM-DD" size="large" defaultValue={[moment().subtract(30, 'day'), moment()]}
            placeholder={['Start Date', 'End Date']}
            onChange={this._dateChange}
            ranges={{
              'Within 1 day': [moment().subtract(1, 'day'), moment()],
              'Within 1 week': [moment().subtract(1, 'week'), moment()],
              'Within 1 month': [moment().subtract(1, 'month'), moment()]
            }}
          />
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Col span="4">
            <Select size='large' placeholder="Network ISP" style={{ width: 130 }} allowClear={true} onChange={this._ispChange}>
              {ispOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Select size='large' placeholder="City" style={{ width: 130 }} allowClear={true} onChange={this._cityChange}>
              {cityOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Select size='large' placeholder="Browser" style={{ width: 130 }} allowClear={true} onChange={this._browserChange}>
              {browserOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Select size='large' placeholder="Device" style={{ width: 130 }} allowClear={true} onChange={this._deviceChange}>
              {deviceOptionView}
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Col span="20">
            <Select size='large' placeholder="Path" style={{ width: 650 }} allowClear={true} onChange={this._pathChange}>
              {pathOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Button type="primary" icon="search" size="large" onClick={this._search}>Search</Button>
          </Col>
        </Row>
      </div>
    );
    return (
      <Layout.Content style={{ marginLeft: '24px', padding: '24px', minHeight: 280, background: '#fff' }}>
        <Tabs type="card">
          <TabPane tab="Errors" key="1"></TabPane>
          <TabPane tab="Logs" key="2"></TabPane>
        </Tabs>
        {exceptionView}
      </Layout.Content>
    )
  }
}