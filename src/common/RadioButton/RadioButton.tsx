import React, { CSSProperties } from 'react';
import './RadioButton.css';

interface RadioButtonProps {
  checked: boolean;
  onChange: (value: string) => void;
  value: string;
  style: CSSProperties;
}

export const RadioButton: React.SFC<RadioButtonProps> = (props) => {
  const { checked, onChange, value, style } = props;

  return (
    <label className='radio-container'>
      <input
        checked={checked}
        type='radio'
        className='radio'
        onChange={() => onChange(value)}>
      </input>
      <span style={style} className='checkmark'></span>
    </label>
  );
};
