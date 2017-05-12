import React from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import { Layout, Table, Tag, Button } from 'antd';
import TimeAreaChart from '../../component/TimeAreaChart';

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
  title: 'Alert Type',
  dataIndex: 'type',
  render: (text, errorObject) => {
    return (
      <span style={{ color: 'red', textDecoration: 'underline' }}>
        {text}
      </span>
    );
  }
}, {
  title: 'Time',
  dataIndex: 'time'
}, {
  title: 'Resolved',
  dataIndex: 'resolved',
  render: (text) => text == 1 ? 'Yes' : 'No'
}, {
  title: 'Resolved Time',
  dataIndex: 'resolved_time',
}, {
  title: 'Action',
  dateIndex: 'action',
  render: (text, item, index) => {
    return (
      <Button type="default" onClick={() => item.parent.resolveAlertAction(item.id)}>
        Resolve
      </Button>
    );
  }
}];

@observer
export default class Alert extends React.Component {
  componentDidMount() {
    autorun(() => {
      if (this.props.alert.website.hostname) {
        this.props.alert.loadAlertStats();
      }
    });
  }
  render() {
    const { alert } = this.props;
    return (
      <Layout.Content style={{ marginLeft: '24px', padding: '24px', minHeight: 280, background: '#fff' }}>
        <TimeAreaChart data={alert.alertStats.slice()} />
        <div style={{ marginTop: '20px' }}>
          <Table columns={columns} dataSource={alert.rawAlertStats.slice()} size="middle" />
        </div>
      </Layout.Content>
    );
  }
}