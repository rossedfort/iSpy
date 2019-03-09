import React from 'react';
import { ThemeContext } from '../../contexts';
import './Button.css';

const Button = (props: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <ThemeContext.Consumer>
      {({ theme: { darker, foreground } }) => (
        <button {...props} style={{ backgroundColor: darker, color: foreground }}>
          { props.children }
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default Button;
