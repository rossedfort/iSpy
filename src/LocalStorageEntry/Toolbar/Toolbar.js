import React, { Component } from 'react';
import { truncate } from '../../utils/truncate';
import './Toolbar.css';

export class Toolbar extends Component {
  render() {
    const { entryKey, onClickEdit, onClickDelete, editLabel } = this.props;

    return (
      <div className="toolbar">
        <section>
          <span>{truncate(entryKey, 40)}</span>
        </section>
        <section>
          <button onClick={onClickEdit}>{editLabel}</button>
          <button onClick={onClickDelete}>delete</button>
        </section>
      </div>
    );
  }
}