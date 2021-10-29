import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Alert from '../../components/form/Alert';
import FormWrapper from '../../components/form/FormWrapper';
import TextField from '../../components/form/TextField';
import useFormError from '../../components/form/useFormError';
import LoadingButton from '../../components/LoadingButton';
import {
  PostsDocument,
  useCreatePostMutation,
} from '../../graphql/generated/graphql';

const initialValues = { title: '', body: '' };

const CreatePost: NextPage<{}> = () => {
  const { error, onError } = useFormError();
  const { push } = useRouter();
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

  const [create, { loading }] = useCreatePostMutation({
    update(proxy, { data }) {
      const cachePosts = proxy.readQuery({
        query: PostsDocument,
      }) as { posts: any } | null;

      if (cachePosts?.posts) {
        const posts = [data?.createPost, ...cachePosts.posts];
        proxy.writeQuery({ query: PostsDocument, data: { posts } });
      }
      push('/');
    },
    onError,
  });

  return (
    <FormWrapper large title='Create new post'>
      <Formik
        initialValues={initialValues}
        onSubmit={(input) =>
          create({ variables: { input: { ...input, file } } })
        }
      >
        <Form className='mt-8 space-y-6'>
          <TextField name='title' autoFocus />
          <TextField component='textarea' rows={5} name='body' />

          <div
            {...getRootProps({
              className:
                'flex items-center justify-center py-6 bg-gray-600 hover:bg-gray-800 transition rounded-md cursor-pointer',
            })}
          >
            <input {...getInputProps()} />
            <div>
              <p className='text-center'>
                Drag drop some files here, or click to select files
              </p>
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  className='w-full object-contain mt-4 px-4'
                  alt='image preview'
                />
              )}
            </div>
          </div>

          <Alert message={error} />
          {fileRejections[0] && (
            <Alert message={fileRejections[0].errors[0].message} />
          )}

          <LoadingButton loading={loading} className='w-full' type='submit'>
            Create post
          </LoadingButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default CreatePost;
