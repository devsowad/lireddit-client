import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Alert from '../../components/form/Alert';
import FormWrapper from '../../components/form/FormWrapper';
import TextField from '../../components/form/TextField';
import useFormError from '../../components/form/useFormError';
import LoadingButton from '../../components/LoadingButton';
import { PostsDocument, useCreatePostMutation } from '../../generated/graphql';

const initialValues = { title: '', body: '' };

const CreatePost: NextPage<{}> = () => {
  const { error, onError } = useFormError();
  const { push } = useRouter();

  const [create, { loading }] = useCreatePostMutation({
    update(proxy, { data }) {
      const cachePosts = proxy.readQuery({ query: PostsDocument });
      console.log({ cachePosts });
      console.log(data?.createPost);
      push('/');
    },
    onError,
  });

  return (
    <FormWrapper title='Create new post'>
      <Formik
        initialValues={initialValues}
        onSubmit={(input) => create({ variables: { input } })}
      >
        <Form className='mt-8 space-y-6'>
          <TextField name='title' autoFocus />
          <TextField name='body' />
          <Alert message={error} />
          <LoadingButton loading={loading} className='w-full' type='submit'>
            Create post
          </LoadingButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default CreatePost;
