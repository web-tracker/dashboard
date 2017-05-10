import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
import {
  Layout, DatePicker, Tabs, Row, Col, Form, Radio, Select,
  Button, Input, Icon, Table, Tooltip, Tag
} from 'antd';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.RadioGroup;

const colorsPreset = ['#f50', '#2db7f5', '#108ee9', '#87d068'];
const columns = [{
  title: 'Count',
  dataIndex: 'count',
  render: (text, obj, index) => {
    let i = 0;
    if (index <= 2) i = 0;
    else if (index <= 6) i = 1;
    else if (index <= 12) i = 2;
    else i = 3;
    return <Tag color={colorsPreset[i]}>{text}</Tag>
  }
}, {
  title: 'Message',
  dataIndex: 'message',
  render: (text, errorObject) => {
    return (
      <Tooltip title="View Details" placement="bottom">
        <Link key={text} to={{ pathname: "/dashboard/errors/detail", state: errorObject }}
          style={{ color: 'red', textDecoration: 'underline' }}
        >
          {text}
        </Link>
      </Tooltip>
    );
  }
}, {
  title: 'Script URL',
  dataIndex: 'script_url',
}, {
  title: 'Col',
  dataIndex: 'column',
}, {
  title: 'Line',
  dataIndex: 'line',
}, {
  title: 'Time',
  dataIndex: 'time'
}];

@observer
export default class Errors extends Component {
  options = {
    key: null,
    dateRange: null,
    path: null,
    network_isp: null,
    city: null,
    browser: null,
    device: null
  };

  componentDidMount() {
    autorun(() => {
      if (this.props.error.website) {
        this._search();
      }
    });
  }

  _dateChange = (date, dateString) => {
    this.options.dateRange = (dateString);
    // Automatically reload
    this._search();
  }

  _pathChange = (value) => {
    if (value) {
      this.options.path = btoa(value);
      // Automatically reload
      this._search();
    }
  }

  _ispChange = (value) => {
    this.options.network_isp = value;
    // Automatically reload
    this._search();
  }

  _cityChange = (value) => {
    this.options.city = value;
    // Automatically reload
    this._search();
  }

  _browserChange = (value) => {
    this.options.browser = value;
    // Automatically reload
    this._search();
  }

  _deviceChange = (value) => {
    this.options.device = value;
    // Automatically reload
    this._search();
  }

  _tabChange = (key) => {
    const { metric } = this.props;
    this.setState({
      currentTab: key
    });

    // Automatically reload
    this._search();
  }

  _search = () => {
    setTimeout(() => {
      this.props.error.getQueryData(this.options);
    }, 0);
  }

  render() {
    const { category, error } = this.props;
    console.log(error.queryErrors.slice());
    const pathOptionView = category.path.slice().map(path => (
      <Select.Option key={path.script_url}>{path.script_url}</Select.Option>
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

    const selectionView = (
      <div>
        <Row>
          <Col span="8">
            <RangePicker format="YYYY-MM-DD" size="large" defaultValue={[moment().subtract(30, 'day'), moment()]}
              placeholder={['Start Date', 'End Date']}
              onChange={this._dateChange}
              style={{ width: 265 }}
              ranges={{
                'Within 1 day': [moment().subtract(1, 'day'), moment()],
                'Within 1 week': [moment().subtract(1, 'week'), moment()],
                'Within 1 month': [moment().subtract(1, 'month'), moment()]
              }}
            />
          </Col>
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
        <Row style={{ marginTop: '10px' }}>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Col span="21">
            <Select size='large' placeholder="Path" style={{ width: 700 }} allowClear={true} onChange={this._pathChange}>
              {pathOptionView}
            </Select>
          </Col>
          <Col span="2">
            <Button type="primary" icon="search" size="large" onClick={this._search}>Search</Button>
          </Col>
        </Row>
      </div>
    );
    const tableView = (
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={error.queryErrors.slice()} size="middle" />
      </div>
    );
    return (
      <Layout.Content style={{ marginLeft: '24px', padding: '24px', minHeight: 280, background: '#fff' }}>
        <Tabs type="card">
          <TabPane tab="Errors" key="1"></TabPane>
          <TabPane tab="Logs" key="2"></TabPane>
        </Tabs>
        {selectionView}
        {tableView}
      </Layout.Content>
    );
  }
}