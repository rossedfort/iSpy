import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/styles/prism';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/tomorrow';

import Toolbar from './Toolbar/Toolbar';
import './LocalStorageEntry.css';

class LocalStorageEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      editorHeight: 100,
    };
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
    const { onDelete, entry: { id } } = this.props;

    onDelete(id);
  }

  setEditorHeight = (element) => {
    if (element) {
      this.setState({ editorHeight: element.clientHeight })
    }
  }

  render() {
    const { entry, onEntryChange } = this.props;
    const { isEditing, editorHeight } = this.state;

    return (
      <div className="local-storage-entry">
        <Toolbar
          entryKey={ entry.parsed.key }
          editLabel={ isEditing ? 'save' : 'edit' }
          onClickEdit={ isEditing ? this.onClickSave : this.onClickEdit }
          onClickDelete={this.onClickDelete}
        />
        {
          isEditing ?
            <AceEditor
              wrapEnabled
              mode="json"
              theme="tomorrow"
              width="380px"
              height={`${editorHeight}px`}
              showGutter={false}
              highlightActiveLine={false}
              value={entry.parsed.value}
              onChange={(value) => onEntryChange(entry.id, value)}
              editorProps={{ $blockScrolling: true }}
            /> :
            <div ref={this.setEditorHeight}>
              <SyntaxHighlighter
                language='json'
                style={ hopscotch }
                codeTagProps={{ styles: { fontSize: '12px' } }}
                customStyle={{ margin: '0', fontSize: '12px' }}>
                  { entry.parsed.value }
              </SyntaxHighlighter>
            </div>
        }
      </div>
    )
  }
}

export default LocalStorageEntry;
