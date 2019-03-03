import React, { Component } from 'react';
import './Toggle.css';

export class Toggle extends Component {
  render() {
    const { value, onToggle } = this.props

    return (
      <label className="switch">
        <input type="checkbox" onChange={onToggle} checked={value}></input>
        <span className="slider"></span>
      </label>
    );
  }
}
