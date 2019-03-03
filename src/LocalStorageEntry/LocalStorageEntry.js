import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/styles/prism';

import './LocalStorageEntry.css';

export class LocalStorageEntry extends Component {
  render() {
    const { entry: { key, value } } = this.props;
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch (error) {
      parsedValue = value;
    }

    return (
      <div className="local-storage-entry">
      <div className="toolbar">
        <button>Edit</button>
        <button>Delete</button>
      </div>
        <SyntaxHighlighter
          language='json'
          style={ hopscotch }
          customStyle={{ margin: '0' }}>
            { JSON.stringify({ [key]: parsedValue }, null, 2) }
        </SyntaxHighlighter>
      </div>
    )
  }
}
