import React, { Component } from 'react';
import './Toolbar.css';

export class Toolbar extends Component {
  render() {
    const { onClickEdit, onClickDelete } = this.props;

    return (
      <div className="toolbar">
        <button onClick={onClickEdit}>Edit</button>
        <button onClick={onClickDelete}>Delete</button>
      </div>
    );
  }
}