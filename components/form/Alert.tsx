import { BadgeCheckIcon, ExclamationIcon } from '@heroicons/react/solid';
import React from 'react';

interface Props {
  message: string;
  type?: 'error' | 'success';
}

const Alert: React.FC<Props> = ({ message, type = 'error' }) => {
  if (!message.length) return null;

  const color =
    type === 'error'
      ? 'bg-red-200 bg-opacity-50 text-red-700 dark:bg-red-300 dark:bg-opacity-40 dark:text-white'
      : 'bg-green-200 bg-opacity-50 text-green-700 dark:bg-green-300 dark:bg-opacity-40 dark:text-white';

  const iconContainerClass = type === 'error' ? 'bg-red-200' : 'bg-green-200';

  return (
    <div className={`${color} rounded-md shadow-md font-medium px-4 py-3`}>
      <div className='flex items-center'>
        <div
          className={`${iconContainerClass} flex-shrink-0 flex items-center justify-center rounded-full h-10 w-10`}
        >
          {type === 'error' ? (
            <ExclamationIcon
              className='h-6 w-6 text-red-600'
              aria-hidden='true'
            />
          ) : (
            <BadgeCheckIcon
              className='h-6 w-6 text-green-600'
              aria-hidden='true'
            />
          )}
        </div>
        <div className='ml-2 sm:ml-4'>
          <p className='text-sm'>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
