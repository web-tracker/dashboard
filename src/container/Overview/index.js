import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Card, Row, Col, Progress, Icon } from 'antd';
import {
  PieChart, Pie, Sector, Cell, Legend, Brush
} from 'recharts';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import TimeAreaChart from '../../component/TimeAreaChart';

const { Content } = Layout;

const data = [
  { name: 'FPT', value: 400 }, { name: 'TLT', value: 300 },
  { name: 'FBT', value: 300 }, { name: 'DLT', value: 200 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

@observer
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelWidth: 0
    }
  }

  componentDidMount() {
    this._resetAreaChartWidth();
    // Load default data for overview tab
    autorun(() => {
      if (this.props.metric.website.hostname) {
        this.props.metric._averageFirstPaintTimeOverhead();
        this.props.metric._averageLoadingTimeOverhead();
        this.props.metric._timeOverview();
      }
    });
  }

  _resetAreaChartWidth() {
    const width = ReactDOM.findDOMNode(this.refs.container).offsetWidth;
    const cardHeight = ReactDOM.findDOMNode(this.refs.card).offsetHeight;
    this.setState({
      panelWidth: width - 90,
      cardWidth: width / 3,
      cardHeight: cardHeight
    });
  }

  render() {
    const { metric } = this.props;
    const lto = {
      percent: metric.averageLoadingTimeOverhead
    };
    const fpt = {
      percent: metric.averageFirstPaintTimeOverhead
    };
    if (metric.averageLoadingTimeOverhead <= 0) {
      lto.status = 'success';
      lto.format = () => 'Perfect';
      lto.percent = 100;
    } else if (metric.averageLoadingTimeOverhead >= 50) {
      lto.status = 'exception';
      lto.format = (percent) => percent + '%'
    } else {
      lto.status = 'active';
      lto.format = (percent) => percent + '%';
    }

    if (metric.averageFirstPaintTimeOverhead <= 0) {
      fpt.status = 'success';
      fpt.format = () => 'Perfect';
      fpt.percent = 100;
    } else if (metric.averageFirstPaintTimeOverhead >= 50) {
      fpt.status = 'exception';
      fpt.format = (percent) => percent + '%'
    } else {
      fpt.status = 'active';
      fpt.format = (percent) => percent + '%';
    }
    return (
      <Content style={{ padding: '24px', minHeight: 280 }} ref="container">
        <div style={{ marginTop: '-20px', padding: 0, minHeight: '300px' }}>
          <Row>
            <Col span="7" ref="card">
              <Card title="Loading Time Overhead" bordered={false}>
                <Progress
                  type="dashboard"
                  width={this.state.panelWidth / 3.9}
                  format={lto.format}
                  percent={lto.percent}
                  status={lto.status}
                />
              </Card>
            </Col>
            <Col span="8" offset="1">
              <Card title="Overview" bordered={false}>
                <PieChart width={330} height={208}>
                  <Legend verticalAlign="bottom" align="center" margin={{ left: 200 }} height={10} width={250} />
                  <Pie
                    data={data}
                    cx={this.state.cardWidth / 2 - 30}
                    cy={this.state.cardHeight / 2 - 20}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={this.state.cardHeight / 2.7 - 50}
                    outerRadius={this.state.cardHeight / 2.4}
                    fill="#8884d8"
                    paddingAngle={1}
                  >
                    {
                      data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                </PieChart>
              </Card>
            </Col>
            <Col span="7" offset="1">
              <Card title="First Paint Time Overhead" bordered={false}>
                <Progress
                  type="dashboard"
                  width={this.state.panelWidth / 3.9}
                  format={fpt.format}
                  percent={fpt.percent}
                  status={fpt.status}
                />
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Card title="Time Overview" bordered={false}>
              <TimeAreaChart data={metric.metricTimeOverview.slice()} />
            </Card>
          </Row>
        </div>
      </Content>
    );
  }
}

export default Dashboard;