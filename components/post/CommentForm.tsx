import { Form, Formik } from 'formik';
import React from 'react';
import {
  CommentsDocument,
  CommentsQuery,
  useCreateCommentMutation,
} from '../../graphql/generated/graphql';
import Image from 'next/image';
import TextField from '../form/TextField';
import Alert from '../form/Alert';
import useFormError from '../form/useFormError';
import LoadingButton from '../LoadingButton';

interface Props {
  postId: string;
}

const CommentForm: React.FC<Props> = ({ postId }) => {
  const { error, onError } = useFormError();
  const [addComment, { loading }] = useCreateCommentMutation({
    update(proxy, { data }) {
      const cacheComments = proxy.readQuery({
        query: CommentsDocument,
        variables: { postId, limit: 10 },
      }) as CommentsQuery;
      const comments = [
        data?.createComment,
        ...cacheComments.comments.comments,
      ];
      proxy.writeQuery({
        query: CommentsDocument,
        variables: { postId, limit: 10 },
        data: {
          comments: { comments, hasMore: cacheComments.comments.hasMore },
        },
      });
    },
    onError,
  });

  return (
    <div className='flex mt-2'>
      <div className='relative flex-shrink-0 h-10 w-10'>
        <Image
          className='rounded-full'
          src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
          alt=''
          layout='fill'
        />
      </div>
      <Formik
        initialValues={{ body: '' }}
        onSubmit={(input) =>
          addComment({ variables: { input: { ...input, postId } } })
        }
      >
        <Form className='w-full ml-4'>
          <TextField component='textarea' rows={2} name='body' />
          <Alert message={error} />
          <div className='flex justify-end'>
            <LoadingButton loading={loading} className='mt-2' type='submit'>
              Comment
            </LoadingButton>
          </div>
        </Form>
      </Formik>
      {/* <Form onSubmit={addComment} className='w-full'>
        <textarea
          name='body'
          value={formData.body}
          onChange={handleChange}
          className='input w-full mb-2'
          rows={2}
        />
        <FormError error={error} />
        <div className='text-right mt-2'>
          <SubmitButton loading={addingComment} text='Add comment' submit />
        </div>
      </Form> */}
    </div>
  );
};

export default CommentForm;
