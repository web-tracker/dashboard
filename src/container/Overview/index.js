import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Card, Row, Col, Progress } from 'antd';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Sector, Cell, Legend
} from 'recharts';
import {observer} from 'mobx-react';

import TimeOverview from '../../component/TimeOverview';

const { Content } = Layout;

const data1 = [
      {name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8'},
      {name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed'},
      {name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1'},
      {name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d'},
      {name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c'},
      {name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57'},
      {name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658'}
    ];

const data = [{name: 'FPT', value: 400}, {name: 'TLT', value: 300},
              {name: 'FBT', value: 300}, {name: 'DLT', value: 200}
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
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
    const {metric} = this.props;
    const ltoStatus = metric.averageLoadingTimeOverhead >= 50 ? 'exception': 'active';
    const fptStatus = metric.averageFirstPaintTimeOverhead >= 50 ? 'exception': 'active';
    return (
      <Content style={{ padding: '24px', minHeight: 280 }} ref="container">
        <div style={{ marginTop: '-20px', padding: 0, minHeight: '300px' }}>
          <Row>
              <Col span="7" ref="card">
                <Card title="Loading Time Overhead" bordered={false}>
                  <Progress
                    type="dashboard"
                    width={this.state.panelWidth / 3.9}
                    format={percent => percent + '‰'}
                    percent={metric.averageLoadingTimeOverhead}
                    status={ltoStatus}
                  />
                </Card>
              </Col>
              <Col span="8" offset="1">
                <Card title="Overview" bordered={false}>
                  <PieChart width={330} height={208}>
                    <Legend verticalAlign="bottom" align="center" margin={{left: 200}} height={10} width={250}/>
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
                        data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
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
                    format={percent => percent + '‰'}
                    percent={metric.averageFirstPaintTimeOverhead}
                    status={fptStatus}
                  />
                </Card>
              </Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Card title="Time Overview" bordered={false}>
              <TimeOverview metric={metric}/>
            </Card>
          </Row>
        </div>
      </Content>
    );
  }
}

export default Dashboard;