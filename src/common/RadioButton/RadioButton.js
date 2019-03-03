import React, { Component } from 'react';
import './RadioButton.css';

export class RadioButton extends Component {
  render() {
    const { checked, onChange, value, style } = this.props;

    return (
      <label className="radio-container">
        <input
          checked={checked}
          type="radio"
          className="radio"
          onChange={() => onChange(value)}>
        </input>
        <span style={style} className="checkmark"></span>
      </label>
    );
  }
}
