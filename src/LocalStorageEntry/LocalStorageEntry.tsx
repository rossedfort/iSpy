import React, { useCallback, useState } from 'react';
import AceEditor from 'react-ace';
import { AceEditorClass } from 'react-ace/lib/AceEditorClass';
/* tslint:disable ordered-imports */
import 'brace/mode/json';
import 'brace/theme/solarized_light';
/* tslint:enable ordered-imports */
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './LocalStorageEntry.css';
import Toolbar from './Toolbar/Toolbar';

interface LocalStorageEntryProps {
  entry: LocalStorageRecord;
  onEntryChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string) => void;
}

const LocalStorageEntry: React.FC<LocalStorageEntryProps> = ({ entry, onEntryChange, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = useCallback(() => {
    const { id } = entry;
    onSave(id);
  }, [onSave, entry]);

  const handleDelete = useCallback(() => {
    const { id } = entry;
    onDelete(id);
  }, [onDelete, entry]);

  const focusEditor = useCallback((editor: AceEditorClass) => {
    editor.textInput.focus();
  }, []);

  const onClickEdit = useCallback(() => {
    if (isEditing) {
      setIsEditing(false);
      handleSave();
    } else {
      setIsEditing(true);
    }
  }, [isEditing, handleSave]);

  return (
    <div className='local-storage-entry'>
      <Toolbar
        entryKey={entry.parsed.key}
        editLabel={isEditing ? 'save' : 'edit'}
        onClickEdit={onClickEdit}
        onClickDelete={handleDelete}
      />
      {
        isEditing ?
          <AceEditor
            onLoad={focusEditor}
            wrapEnabled
            mode='json'
            theme='solarized_light'
            width='380px'
            maxLines={Infinity}
            showGutter={false}
            highlightActiveLine={false}
            value={entry.parsed.value}
            onChange={(value) => onEntryChange(entry.id, value)}
            editorProps={{ $blockScrolling: true }}
          /> :
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
            customStyle={{ whiteSpace: 'pre-wrap', margin: '0', padding: '0px 0px 4px 4px', fontSize: '12px' }}>
            {entry.parsed.value}
          </SyntaxHighlighter>
      }
    </div>
  );
};

export default LocalStorageEntry;
