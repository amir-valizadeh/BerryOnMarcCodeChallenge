import React from 'react';
import { ActionButtonProps } from '../../Types/landing.ts';

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  text,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default ActionButton;
