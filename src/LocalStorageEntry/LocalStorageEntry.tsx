import 'brace/mode/json';
import 'brace/theme/tomorrow';
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/prism';
import { hopscotch } from 'react-syntax-highlighter/dist/styles/prism';

import './LocalStorageEntry.css';
import Toolbar from './Toolbar/Toolbar';

interface LocalStorageEntryProps {
  entry: LocalStorageRecord;
  onEntryChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string) => void;
}

interface LocalStorageEntryState {
  editorHeight: number;
  isEditing: boolean;
}

class LocalStorageEntry extends Component<LocalStorageEntryProps, LocalStorageEntryState> {
  constructor(props: LocalStorageEntryProps) {
    super(props);

    this.state = {
      editorHeight: 100,
      isEditing: false,
    };
  }

  public render() {
    const { entry, onEntryChange } = this.props;
    const { isEditing, editorHeight } = this.state;

    return (
      <div className='local-storage-entry'>
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
              mode='json'
              theme='tomorrow'
              width='380px'
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
                style={hopscotch}
                codeTagProps={
                  {
                    style: {
                      fontFamily: 'Monaco, Menlo, Consolas, source-code-pro, monospace',
                      fontSize: '12px',
                    },
                  } as any
                }
                customStyle={{ margin: '0', padding: '0', fontSize: '12px' }}>
                  { entry.parsed.value }
              </SyntaxHighlighter>
            </div>
        }
      </div>
    );
  }

  private onClickEdit = () => {
    this.setState({ isEditing: true });
  }

  private onClickSave = () => {
    this.setState({ isEditing: false });
    const { onSave, entry: { id } } = this.props;

    onSave(id);
  }

  private onClickDelete = () => {
    const { onDelete, entry: { id } } = this.props;

    onDelete(id);
  }

  private setEditorHeight = (element: HTMLDivElement) => {
    if (element) {
      this.setState({ editorHeight: element.clientHeight });
    }
  }
}

export default LocalStorageEntry;
