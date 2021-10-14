import React, { MouseEventHandler } from 'react';

interface Props {
  icon: React.FC<React.ComponentProps<'svg'>>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const IconButton: React.FC<Props> = ({ className, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`text-gray-700 hover:bg-gray-300 bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 dark:bg-gray-600 p-2.5 rounded-full transition ${className}`}
    >
      <Icon className='w-7' />
    </button>
  );
};

export default IconButton;
