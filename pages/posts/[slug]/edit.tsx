import { Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
import Image from 'next/image';

interface Props {
  //
}

const Edit: React.FC<Props> = () => {
  const { error, onError } = useFormError();
  const router = useRouter();
  const { data } = usePostQuery({
    variables: { slug: router.query.slug as string, onEdit: true },
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: false,
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFile(file);
      }
    },
  });

  const [update, { loading }] = useUpdatePostMutation({
    update(_, { data: post }) {
      router.push(`/posts/${post?.updatePost.slug}`);
    },
    onError,
  });

  return (
    <FormWrapper large title={`Updating "${data?.post?.title}"`}>
      <Formik
        initialValues={{
          title: data?.post?.title || '',
          body: data?.post?.body || '',
        }}
        onSubmit={(input) =>
          update({
            variables: { input: { id: data?.post?.id!, ...input, file } },
          })
        }
      >
        <Form className='mt-8 space-y-6'>
          <TextField name='title' autoFocus />
          <TextField name='body' />
          <div
            {...getRootProps({
              className:
                'flex items-center justify-center py-6 bg-gray-600 hover:bg-gray-800 transition rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-800',
            })}
          >
            <input {...getInputProps()} accept='image/*' />
            <div className='w-full'>
              <p className='text-center'>
                Drag drop image here, or click to select file
              </p>
              <div className='relative w-full h-96 mt-4 px-4'>
                <Image
                  src={previewUrl || data?.post?.imageUrl!}
                  alt={previewUrl ? 'new image' : data?.post?.title}
                  objectFit='contain'
                  layout='fill'
                />
              </div>
            </div>
          </div>

          <Alert message={error} />
          {fileRejections[0] && (
            <Alert message={fileRejections[0].errors[0].message} />
          )}
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
