import React, { Component } from 'react';
import './RadioButton.css';

export class RadioButton extends Component {
  render() {
    const { checked, onChange, value } = this.props;

    return (
      <label className="radio-container">
        <input
          checked={checked}
          type="radio"
          className="radio"
          onChange={() => onChange(value)}>
        </input>
        <span className="checkmark"></span>
      </label>
    );
  }
}
