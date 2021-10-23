import { Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Alert from '../../../components/form/Alert';
import FormWrapper from '../../../components/form/FormWrapper';
import TextField from '../../../components/form/TextField';
import useFormError from '../../../components/form/useFormError';
import LoadingButton from '../../../components/LoadingButton';
import {
  PostDocument,
  usePostQuery,
  useUpdatePostMutation,
} from '../../../graphql/generated/graphql';
import { initializeApollo } from '../../../lib/graphql';

interface Props {
  //
}

const Edit: React.FC<Props> = () => {
  const { error, onError } = useFormError();
  const router = useRouter();
  const { data } = usePostQuery({
    variables: { slug: router.query.slug as string, onEdit: true },
  });

  const [update, { loading }] = useUpdatePostMutation({
    update(_, { data: post }) {
      router.push(`/posts/${post?.updatePost.slug}`);
    },
    onError,
  });

  return (
    <FormWrapper title={`Updating "${data?.post?.title}"`}>
      <Formik
        initialValues={{
          title: data?.post?.title || '',
          body: data?.post?.body || '',
        }}
        onSubmit={(input) =>
          update({ variables: { updatePostId: data?.post?.id!, ...input } })
        }
      >
        <Form className='mt-8 space-y-6'>
          <TextField name='title' autoFocus />
          <TextField name='body' />
          <Alert message={error} />
          <LoadingButton loading={loading} className='w-full' type='submit'>
            Update post
          </LoadingButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const client = initializeApollo();
  await client.query({
    query: PostDocument,
    variables: { slug: query.slug, onEdit: true },
    context: {
      headers: {
        cookie: req.headers.cookie,
      },
    },
  });

  return { props: { initialApolloState: client.cache.extract() } };
};
