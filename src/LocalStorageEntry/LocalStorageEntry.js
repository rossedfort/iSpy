import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/styles/prism';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/twilight';
import { Toolbar } from './Toolbar';
import './LocalStorageEntry.css';

export class LocalStorageEntry extends Component {
  constructor(props) {
    super(props);

    this.state = { isEditing: false };
  }

  onClickEdit = () => {
    this.setState({ isEditing: true });
  }

  onClickSave = () => {
    this.setState({ isEditing: false });
    const { onSave, entry: { id } } = this.props;
    onSave(id);
  }

  onClickDelete = () => {
    const { onDelete, entry: { key } } = this.props;

    onDelete(key);
  }

  render() {
    const { entry, onEntryChange } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="local-storage-entry">
        <Toolbar
          editLabel={ isEditing ? 'save' : 'edit' }
          onClickEdit={ isEditing ? this.onClickSave : this.onClickEdit }
          onClickDelete={this.onClickDelete}
        />
        {
          isEditing ?
            <AceEditor
              wrapEnabled
              mode="json"
              theme="twilight"
              width="380px"
              height="100px"
              showGutter={false}
              value={entry.parsed.value}
              onChange={(value) => onEntryChange(entry.id, value)}
            /> :
            <SyntaxHighlighter
              language='json'
              style={ hopscotch }
              codeTagProps={{ styles: { fontSize: '12px' } }}
              customStyle={{ margin: '0', fontSize: '12px' }}>
                { entry.stringified }
            </SyntaxHighlighter>
        }
      </div>
    )
  }
}
