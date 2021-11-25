import { Transition, Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, useRef, useState } from 'react';
import {
  PostsDocument,
  PostsQueryResult,
  RegularPostFragment,
  useDeletePostMutation,
} from '../../graphql/generated/graphql';
import ConfirmDialog from '../ConfirmDialog';

interface Props {
  postId: string;
}

const Delete: React.FC<Props> = ({ postId }) => {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  const cancelButtonRef = useRef(null);

  const [deletePost, { loading }] = useDeletePostMutation({
    variables: { deletePostId: postId },
    update(proxy) {
      const cachePosts = proxy.readQuery({
        query: PostsDocument,
      }) as { posts: RegularPostFragment[] } | null;

      if (cachePosts?.posts) {
        const posts = cachePosts.posts.filter((p) => p.id === postId);
        proxy.writeQuery({ query: PostsDocument, data: { posts } });
      }
      push('/');
    },
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label='delete post'
        className='w-10 h-10 rounded-full transition hover:bg-red-200 dark:hover:bg-red-500 inline-flex items-center justify-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
      </button>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        onDelete={deletePost}
        loading={loading}
        title='Delete Post'
      >
        Are you sure you want to delete this post? This action cannot be undone.
      </ConfirmDialog>
    </>
  );
};

export default Delete;
