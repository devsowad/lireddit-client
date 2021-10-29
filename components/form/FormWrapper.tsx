import React from 'react';

interface Props {
  title: string;
  showHeading?: boolean;
  large?: boolean;
}

const FormWrapper: React.FC<Props> = ({
  title,
  children,
  showHeading = false,
  large,
}) => {
  return (
    <div
      className={`${
        large ? 'max-w-2xl' : 'max-w-md'
      } mx-auto rounded-xl shadow-2xl bg-white dark:bg-gray-700 mt-10 py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div
        className={`${
          large ? 'max-w-2xl' : 'max-w-md'
        } max-w-2xl w-full space-y-8`}
      >
        <div>
          {showHeading && (
            <h1 className='text-3xl text-center font-bold mb-6'>LiReddit</h1>
          )}
          <h2 className='text-center text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
