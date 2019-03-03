import React, { Component } from 'react';
import { ThemeContext } from '../../contexts';
import { truncate } from '../../utils/truncate';
import { Button } from '../../common';
import './Toolbar.css';

class Toolbar extends Component {
  render() {
    const { entryKey, onClickEdit, onClickDelete, editLabel } = this.props;

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
}

export default Toolbar;
