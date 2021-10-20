import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import Alert from '../components/form/Alert';
import FormWrapper from '../components/form/FormWrapper';
import TextField from '../components/form/TextField';
import useFormError from '../components/form/useFormError';
import LoadingButton from '../components/LoadingButton';
import { useLoginMutation } from '../graphql/generated/graphql';
import { updateMe } from '../graphql/update/updateMe';
import { useUserState } from '../store/user';

interface Props {
  //
}

const initialValues = { usernameOrEmail: 'user', password: 'password123' };

const Login: NextPage<Props> = () => {
  const router = useRouter();
  const { error, onError, resetError } = useFormError();

  const [_, setUser] = useUserState();

  const [login, { loading }] = useLoginMutation({
    update(proxy, { data }) {
      resetError();
      updateMe({ proxy, data: data?.login });
      setUser(data?.login);
      router.push('/');
    },
    onError,
  });

  return (
    <FormWrapper title='Sign in to your account' showHeading>
      <Formik
        initialValues={initialValues}
        onSubmit={(input) => login({ variables: { input } })}
      >
        <Form className='mt-8 space-y-6'>
          <TextField
            name='usernameOrEmail'
            title='Username or email'
            autoFocus
          />
          <TextField name='password' type='password' />
          <Link href='/forgot-password' passHref>
            <a className='text-sm underline'>Forgot your password?</a>
          </Link>
          <Alert message={error} />
          <LoadingButton loading={loading} className='w-full' type='submit'>
            Login
          </LoadingButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default Login;
