import React from 'react';
import './Toggle.css';

interface ToggleProps {
  value: boolean;
  onToggle: () => void;
}

export const Toggle: React.SFC<ToggleProps> = (props) => {
  const { value, onToggle } = props;

  return (
    <label className='switch'>
      <input type='checkbox' onChange={onToggle} checked={value}></input>
      <span className='slider'></span>
    </label>
  );
};
