import React, { Component } from 'react';
import { ThemeContext } from '../../contexts';
import './Button.css';

export class Button extends Component {
  render() {
    const props = this.props;
    const { theme: { darker, foreground } } = this.context;

    return (
      <button
        {...props}
        style={{
          backgroundColor: darker,
          color: foreground,
        }}
      >
        { props.children }
      </button>
    );
  }
}

Button.contextType = ThemeContext;
