import React from 'react';
import { ThemeContext } from '../../contexts';
import './Button.css';

const Button: React.SFC<React.HTMLProps<HTMLButtonElement>> = (props) => {
  return (
    <ThemeContext.Consumer>
      {({ theme: { darker, foreground } }) => (
        <button {...props} style={{ backgroundColor: darker, color: foreground }}>
          { props.children }
        </button>
      )}
    </ThemeContext.Consumer>
  );
};

export default Button;
