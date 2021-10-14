import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Alert from '../../components/form/Alert';
import FormWrapper from '../../components/form/FormWrapper';
import TextField from '../../components/form/TextField';
import useFormError from '../../components/form/useFormError';
import LoadingButton from '../../components/LoadingButton';
import { useChangePasswordMutation } from '../../generated/graphql';
import { updateMe } from '../../graphql/update/updateMe';
import Link from 'next/link';

interface Props {
  //
}

type initialValuesType = {
  newPassword: string;
  confirmPassword: string;
};

const initialValues: initialValuesType = {
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword: NextPage<Props> = () => {
  const { error, onError, resetError } = useFormError();
  const { query, push } = useRouter();
  const token = query.token as string;
  const [changePassword, { loading }] = useChangePasswordMutation({
    update(proxy, { data }) {
      resetError();
      updateMe({ proxy, data: data?.changePassword });
      push('/');
    },
    onError,
  });

  const handleSubmit = (input: initialValuesType) => {
    changePassword({ variables: { input: { ...input, token } } });
  };

  return (
    <FormWrapper title='Change password' showHeading>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className='mt-8 space-y-6'>
          <TextField
            autoFocus
            name='newPassword'
            title='New password'
            type='password'
          />
          <TextField
            name='confirmPassword'
            title='Confirm password'
            type='password'
          />
          <Alert message={error} />
          <LoadingButton loading={loading} className='w-full' type='submit'>
            Login
          </LoadingButton>
          <Link href='/forgot-password' passHref>
            <a className='btn'>Resend recovery email</a>
          </Link>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default ChangePassword;
