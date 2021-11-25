import React, { Fragment, useState } from 'react';
import {
  CommentsQuery,
  RegularCommentFragment,
  useDeleteCommentMutation,
} from '../../graphql/generated/graphql';
import Image from 'next/image';
import ReactMoment from 'react-moment';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid';
import ConfirmDialog from '../ConfirmDialog';

interface Props {
  username: string | undefined;
  postId: string;
  comments: CommentsQuery;
}

const Comments: React.FC<Props> = ({ username, postId, comments }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmingCommentID, setConfirmingCommentID] = useState<string | null>(
    null
  );

  const confirmDelete = (id: string) => {
    setConfirmingCommentID(id);
    setOpenDialog(true);
  };

  const [deleteComment, { loading }] = useDeleteCommentMutation({
    update(proxy) {
      setOpenDialog(false);
    },
    onError(err) {
      console.log(err);
    },
    variables: { deleteCommentId: confirmingCommentID! },
  });

  return (
    <div className='space-y-4'>
      {comments.comments.comments.map((comment) => (
        <div key={comment.id}>
          <div className='flex items-center'>
            <div className='relative flex-shrink-0 h-10 w-10'>
              <Image
                className='rounded-full'
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                alt={comment.user.username}
                layout='fill'
              />
            </div>
            <div className='flex justify-between w-full ml-4'>
              <div>
                <h5 className='text-sm font-medium gray-300 capitalize'>
                  {comment.user.username}
                </h5>
                <ReactMoment fromNow className='text-sm gray-400'>
                  {comment.createdAt}
                </ReactMoment>
              </div>
              {comment.user.username === username && (
                <Menu as='div' className='relative inline-block text-left'>
                  <Menu.Button className='p-1'>
                    <DotsVerticalIcon className='w-5 h-5' />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none py-1.5'>
                      <Menu.Item>
                        <button
                          onClick={() => confirmDelete(comment.id)}
                          className='text-left inline-flex hover:bg-red-100 text-red-600 w-full px-4 py-2 text-sm font-semibold '
                        >
                          <TrashIcon className='w-5 mr-2' />
                          Delete
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
          <p className='mt-2 ml-14 font-medium gray-300'>{comment.body}</p>
        </div>
      ))}
      <ConfirmDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title='Delete Comment'
        onDelete={deleteComment}
        loading={loading}
      >
        Are you sure you want to delete your comment? This action cannot be
        undone.
      </ConfirmDialog>
    </div>
  );
};

export default Comments;
