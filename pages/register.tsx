import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Alert from '../components/form/Alert';
import FormWrapper from '../components/form/FormWrapper';
import TextField from '../components/form/TextField';
import useFormError from '../components/form/useFormError';
import LoadingButton from '../components/LoadingButton';
import { useRegisterMutation } from '../graphql/generated/graphql';
import { updateMe } from '../graphql/update/updateMe';
import { useUserState } from '../store/user';

interface Props {
  //
}

const initialValues = { username: '', email: '', password: '' };

const Register: NextPage<Props> = () => {
  const router = useRouter();
  const { error, onError, resetError } = useFormError();
  const [_, setUser] = useUserState();

  const [register, { loading }] = useRegisterMutation({
    update(proxy, { data }) {
      resetError();
      updateMe({ proxy, data: data?.register });
      setUser(data?.register);
      router.push('/');
    },
    onError,
  });

  return (
    <FormWrapper title='Create new account' showHeading>
      <Formik
        initialValues={initialValues}
        onSubmit={(input) => register({ variables: { input } })}
      >
        <Form className='mt-8 space-y-6'>
          <TextField name='username' autoFocus />
          <TextField name='email' />
          <TextField name='password' type='password' />
          <Alert message={error} />
          <LoadingButton loading={loading} className='w-full' type='submit'>
            Sign in
          </LoadingButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default Register;
