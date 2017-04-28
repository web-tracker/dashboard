import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Card, Row, Col, Progress } from 'antd';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  RadialBarChart, RadialBar, Legend
} from 'recharts';
import ReactResizeDetector from 'react-resize-detector';

const { Content } = Layout;
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data1 = [
      {name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8'},
      {name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed'},
      {name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1'},
      {name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d'},
      {name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c'},
      {name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57'},
      {name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658'}
    ];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this._onResize = this._onResize.bind(this);
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
    console.log(cardHeight);
    this.setState({
      panelWidth: width - 90,
      cardWidth: width / 3,
      cardHeight: cardHeight
    });
  }

  _onResize() {
    this._resetAreaChartWidth();
  }
  
  render() {
    return (
      <Content style={{ padding: '24px', minHeight: 280 }} ref="container">
        <div style={{ marginTop: '-20px', padding: 0, minHeight: '300px' }}>
          <Row>
              <Col span="7" ref="card">
                <Card title="Card title" bordered={false}>
                  <Progress type="dashboard" width={this.state.panelWidth / 3.9} percent={75}/>
                </Card>
              </Col>
              <Col span="8" offset="1">
                <Card title="Card title" bordered={false}>
                  <RadialBarChart
                    data={data1}
                    width={this.state.cardWidth - 50}
                    height={this.state.cardHeight - 95}
                    cx={(this.state.cardWidth - 50) / 2}
                    cy={(this.state.cardHeight - 95) / 1.5}
                    innerRadius={(this.state.cardWidth - 50) / 20}
                    outerRadius={(this.state.cardWidth - 50) / 2}
                    barSize={this.state.cardWidth / 30}
                  >
                    <RadialBar background clockWise={true} dataKey='uv'/>
                  </RadialBarChart>
                </Card>
              </Col>
              <Col span="7" offset="1">
                <Card title="Card title" bordered={false}>
                  <Progress type="dashboard" width={this.state.panelWidth / 3.9} percent={75}/>
                </Card>
              </Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Card title="Card title" bordered={false}>
              <AreaChart width={this.state.panelWidth} height={200} data={data}
                  margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <XAxis dataKey="name"/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
              <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
              <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
            </AreaChart>
            </Card>
          </Row>
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
      </Content>
    );
  }
}

export default Dashboard;