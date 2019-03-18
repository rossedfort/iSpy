import React from 'react';
import { Button } from '../../common';
import { ThemeContext } from '../../contexts';
import { truncate } from '../../utils/truncate';
import './Toolbar.css';

interface ToolbarProps {
  entryKey: string;
  editLabel: string;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const Toolbar: React.SFC<ToolbarProps> = (props) => {
  const { entryKey, onClickEdit, onClickDelete, editLabel } = props;

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className='toolbar' style={{ backgroundColor: theme.light, color: theme.foreground }}>
          <section>
            <span>{truncate(entryKey, 20)}</span>
          </section>
          <section>
            <Button onClick={onClickEdit}>{editLabel}</Button>
            <Button onClick={onClickDelete}>delete</Button>
          </section>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default Toolbar;
