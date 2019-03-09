import React from 'react';
import { ThemeContext } from '../../contexts';
import { truncate } from '../../utils/truncate';
import { Button } from '../../common';
import './Toolbar.css';

interface ToolbarProps {
  entryKey: string;
  editLabel: string;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const { entryKey, onClickEdit, onClickDelete, editLabel } = props;

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className="toolbar" style={{ backgroundColor: theme.light, color: theme.foreground }}>
          <section>
            <span>{truncate(entryKey, 30)}</span>
          </section>
          <section>
            <Button onClick={onClickEdit}>{editLabel}</Button>
            <Button onClick={onClickDelete}>delete</Button>
          </section>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Toolbar;
