import React from 'react';
import { Icon, Modal } from 'antd';
import './style.css';

export default class ErrorStack extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showModel: false
    };
  }

  openCodeModal = () => {
    this.setState({
      showModel: true
    });
  }

  render() {
    const { stack } = this.props;
    const lines = stack.split('\n').filter(l => l && l.length);
    const errorListView = lines.slice(1).map(line => {
      return <li key={line}><a onClick={this.openCodeModal}>{line}</a></li>;
    });
    return (
      <div style={{ marginLeft: '108px', marginRight: '10px' }}>
        <div className="error-stack">
          <ul>
            <li>
              <Icon type="close-circle" />
              <span style={{ marginLeft: '6px' }}>
                {lines[0]}
              </span>
            </li>
            {errorListView}
          </ul>
        </div>
        <Modal
          width={700}
          visible={this.state.showModel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}