import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import Alert from '../components/form/Alert';
import FormWrapper from '../components/form/FormWrapper';
import TextField from '../components/form/TextField';
import LoadingButton from '../components/LoadingButton';
import { useForgotPasswordMutation } from '../generated/graphql';

interface Props {
  //
}

const ForgotPassword: NextPage<Props> = () => {
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    update(_, data) {
      if (data.data?.forgotPassword) {
        setSuccessMsg('Recovery mail sent successfully! Check your mail');
        setError('');
      } else {
        setError('Failed to sent mail');
      }
    },
    onError(err) {
      setError(err.message);
    },
  });

  return (
    <FormWrapper title='Recover Account' showHeading>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(input) => forgotPassword({ variables: input })}
      >
        <Form className='mt-8 space-y-6'>
          {!successMsg && <TextField name='email' title='Email' autoFocus />}
          <Alert type='success' message={successMsg} />
          <Alert message={error} />
          {!successMsg && (
            <LoadingButton loading={loading} className='w-full' type='submit'>
              Send recovery email
            </LoadingButton>
          )}
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default ForgotPassword;
