import React, {Component} from 'react';
import {
  Layout, Col, Row, Form, DatePicker, Radio, Select,
  Button, Tabs, Input, Icon, Table
} from 'antd';
import moment from 'moment';
import {observer} from 'mobx-react';
import TimeBarchart from '../../component/TimeBarchart';
import SyncAreaChart from '../../component/SyncAreaChart';
import TimeAreaChart from '../../component/TimeAreaChart';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const Search = Input.Search;

@observer
export default class Metric extends Component {

  options = {
    key: null,
    dateRange: null,
    interval: 'day',
    dimension: "network_isp",
    path: null,
    network_isp: null,
    city: null,
    browser: null,
    device: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedKey: 'network_isp',
      interval: 'day',
      currentTab: 'overview'
    }
  }

  componentDidMount() {
    // Load default data for overview tab
    this._search();
  }

  _dateChange = (date, dateString) => {
    this.options.dateRange = (dateString);
    // Automatically reload
    this._search();
  }

  _keyChange = (e) => {
    this.options.dimension = e.target.value;
    this.setState({
      selectedKey: e.target.value
    });
    // Automatically reload
    this._search();
  }

  _intervalChange = (e) => {
    this.options.interval = e.target.value;
    this.setState({
      interval: e.target.value
    });
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
    const {metric} = this.props;
    this.setState({
      currentTab: key
    });

    if (key !== 'overview') {
      this.options.key = key;
      // Automatically reload
      this._search();
    }
  }

  _search = () => {
    setTimeout(() => {
      this.props.metric.getMetricData(this.options);
    }, 0);
  }

  render() {
    const {metric, category} = this.props;
    const overview = (
      <div>
        <TimeAreaChart height={300} data={metric.metricTimeOverview.slice()} syncId="overview"/>
        <TimeBarchart data={metric.metricTimeOverview.slice()} syncId="overview"/>
      </div>
    );
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
    const chartView = (
      <Row>
        <Row>
          <Col span="10">
              <RangePicker
                format="YYYY-MM-DD"
                size="large"
                defaultValue={[moment().subtract(30, 'day'), moment()]}
                ranges={{
                  'Within 1 day': [moment().subtract(1, 'day'), moment()],
                  'Within 1 week': [moment().subtract(1, 'week'), moment()],
                  'Within 1 month': [moment().subtract(1, 'month'), moment()]
                }}
                placeholder={['Start Date', 'End Date']}
                onChange={this._dateChange}
              />
          </Col>
          <Col span="12">
            <RadioGroup value={this.state.selectedKey} style={{marginTop: '5px'}} onChange={this._keyChange}>
              <Radio value='network_isp'>ISP</Radio>
              <Radio value='city'>City</Radio>
              <Radio value='browser'>Browser</Radio>
              <Radio value='device'>Device</Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Col span="4">
            <Select
              size='large'
              placeholder="Network ISP"
              style={{ width: 130 }}
              allowClear={true}
              onChange={this._ispChange}
            >
              {ispOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Select
              size='large'
              placeholder="City"
              style={{ width: 130 }}
              allowClear={true}
              onChange={this._cityChange}
            >
              {cityOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Select
              size='large'
              placeholder="Browser"
              style={{ width: 130 }}
              allowClear={true}
              onChange={this._browserChange}
            >
              {browserOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Select
              size='large'
              placeholder="Device"
              style={{ width: 130 }}
              allowClear={true}
              onChange={this._deviceChange}
            >
              {deviceOptionView}
            </Select>
          </Col>
          <Col>
            <RadioGroup value={this.state.interval} style={{marginTop: '5px'}} onChange={this._intervalChange}>
                <Radio value='day'>By Day</Radio>
                <Radio value='hour'>By Hour</Radio>
                <Radio value='minute'>By Minute</Radio>
              </RadioGroup>
          </Col>
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Col span="20">
            <Select
              size='large'
              placeholder="Path"
              style={{ width: 650 }}
              allowClear={true}
              onChange={this._pathChange}
            >
              {pathOptionView}
            </Select>
          </Col>
          <Col span="4">
            <Button type="primary" icon="search" size="large" onClick={this._search}>Search</Button>
          </Col>
        </Row>
        <div style={{marginTop: '10px'}}>
          <TimeBarchart data={metric.metricQueriedData.slice()} syncId="metric"/>
        </div>
        <SyncAreaChart data={metric.metricSegmentQueriedData.slice()} syncId="metric"/>
      </Row>
    );
    return (
      <Layout.Content style={{ marginLeft: '24px', padding: '24px', minHeight: 280, background: '#fff' }} ref="container">
        <Row>
          <Tabs type="card" onChange={this._tabChange}>
            <TabPane tab="Overview" key="overview"></TabPane>
            <TabPane tab="FPT" key="first_paint_time"></TabPane>
            <TabPane tab="FIT" key="first_interaction_time"></TabPane>
            <TabPane tab="FBT" key="first_byte_time"></TabPane>
            <TabPane tab="TLT" key="total_loading_time"></TabPane>
            <TabPane tab="DNS" key="dns_lookup_time"></TabPane>
            <TabPane tab="Image" key="images_time"></TabPane>
            <TabPane tab="Script" key="scripts_time"></TabPane>
            <TabPane tab="Style" key="styles_time"></TabPane>
          </Tabs>
          { this.state.currentTab !== 'overview' ? chartView : overview}
        </Row>
      </Layout.Content>
    );
  }
}