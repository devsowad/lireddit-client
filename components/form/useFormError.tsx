import { ApolloError } from '@apollo/client';
import { useState } from 'react';

const useFormError = () => {
  const [error, setError] = useState('');
  const onError = (err: ApolloError) => {
    setError(err.message);
  };
  const resetError = () => setError('');

  return { error, onError, resetError };
};

export default useFormError;
