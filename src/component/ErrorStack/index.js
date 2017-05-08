import React from 'react';
import { Icon, Modal, message } from 'antd';
import { observer } from 'mobx-react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

import './style.css';

const urlRegex = /https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?\:(\d)*\:(\d)*/igm;

@observer
export default class ErrorStack extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showModel: false,
      col: 0,
      line: 0
    };
  }

  parseStack(stack) {
    // at http://localhost:9876/base/src/sdk.js:1447:19
    stack = stack.match(urlRegex)[0];
    let token = stack.split(' ');
    token = token[token.length - 1];
    const pos1 = token.lastIndexOf(':');
    const col = token.substring(pos1 + 1);
    token = token.substring(0, pos1);
    const pos2 = token.lastIndexOf(':');
    const line = token.substring(pos2 + 1);
    return {
      url: token.substring(0, pos2),
      col: parseInt(col),
      line: parseInt(line)
    }
  }

  openCodeModal = (lineText) => {
    if (!urlRegex.test(lineText)) {
      message.error('Please select a valid source file');
      return;
    }
    const { url, col, line } = this.parseStack(lineText);
    this.props.errorModel.getSourceCode(url);
    this.setState({
      showModel: true,
      col,
      line
    });
  }

  closeCodeModal = () => {
    this.setState({
      showModel: false
    });
  }

  render() {
    const { errorModel, stack } = this.props;
    const lines = stack.split('\n').filter(l => l && l.length);
    const errorListView = lines.slice(1).map(line => {
      return <li key={line}><a onClick={() => this.openCodeModal(line)}>{line}</a></li>;
    });
    const { col, line } = this.state;
    if (errorModel.sourceCode && errorModel.sourceCode.length > 0) {
      console.log('editor is ready');
      setTimeout(() => {
        const ace = this.refs.ace;
        ace.editor.gotoLine(line);
      }, 400);
    }
    return (
      <div style={{ marginLeft: '108px', marginRight: '10px' }}>
        <div className="error-stack">
          <ul>
            <li>
              <Icon type="close-circle" />
              <a style={{ marginLeft: '6px' }} onClick={() => this.openCodeModal(lines[0])}>{lines[0]}</a>
            </li>
            {errorListView}
          </ul>
        </div>
        <Modal
          width={900}
          visible={this.state.showModel}
          closable={false}
          maskClosable={true}
          onCancel={this.closeCodeModal}
        >
          <AceEditor
            ref="ace"
            width="870px"
            height="600px"
            mode="javascript"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            value={errorModel.sourceCode}
            markers={[{
              startRow: line - 1, startCol: 0, endRow: line, endCol: 0, className: 'myMarker', type: 'background'
            }]}
            readOnly={true}
            editorProps={{ $blockScrolling: true }}
          />
        </Modal>
      </div>
    );
  }
}