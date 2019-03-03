import React, { Component } from 'react';
import './Toolbar.css';

export class Toolbar extends Component {
  render() {
    const { onClickEdit, onClickDelete, editLabel } = this.props;

    return (
      <div className="toolbar">
        <button onClick={onClickEdit}>{editLabel}</button>
        <button onClick={onClickDelete}>delete</button>
      </div>
    );
  }
}