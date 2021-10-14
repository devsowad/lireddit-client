import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

const TextField: React.FC<Props> = (props) => {
  const [field, { error }] = useField(props);

  const { name, type = 'text', title, placeholder } = props;

  return (
    <div className='group transition'>
      <label
        htmlFor={name}
        className='mb-3 group-focus-within:text-blue-700 dark:group-focus-within:text-blue-400'
      >
        {title ? <p>{title}</p> : <p className='capitalize'>{name}</p>}
      </label>
      <input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        {...props}
      />
      <p className='text-sm text-red-500 font-medium'>{error}</p>
    </div>
  );
};

export default TextField;
