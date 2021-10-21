import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Moment from 'react-moment';
import { PostsQuery } from '../../graphql/generated/graphql';

interface Props {
  data: PostsQuery;
}

const Posts: React.FC<Props> = ({ data }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {data.posts.map((post) => (
        <div
          key={post.id}
          className='shadow-lg rounded-lg hover:shadow-2xl content-bg transition'
        >
          <Link href={`/posts/${post.id}`} passHref>
            <a>
              <div className='relative w-full h-[250px]'>
                <Image
                  src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  alt={post.title}
                  layout='fill'
                  objectFit='cover'
                  className='w-full object-cover bg-gray-100 rounded-t-lg'
                />
              </div>
            </a>
          </Link>
          <div className='px-4 py-5 space-y-2'>
            <div className='flex items-center mb-4'>
              <div className='relative flex-shrink-0 h-10 w-10'>
                <Image
                  className='rounded-full'
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                  alt=''
                  layout='fill'
                />
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium gray-300 capitalize'>
                  {post.author.username}
                </div>
                <Moment fromNow className='text-sm gray-500'>
                  {post.createdAt}
                </Moment>
              </div>
            </div>
            <Link href={`/posts/${post.id}`} passHref>
              <a className='text-xl font-medium'>{post.title}</a>
            </Link>
            <p className='text-sm font-medium'>
              {post.body.length > 70
                ? `${post.body.substring(0, 70)}...`
                : post.body}
            </p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-md'>
                {/* <ThumbUpIcon className='mr-1 w-5 text-indigo-600' /> */}
                {/* <p>
                  {post.likesCount} like{post.likesCount > 1 && 's'}
                </p> */}
                {/* <ChatAlt2Icon className='ml-2 mr-1 w-5 text-indigo-600' /> */}
                {/* <p>
                  {post.commentsCount} comment{post.commentsCount > 1 && 's'}
                </p> */}
              </div>
              {/* <LikeButton
                postId={post.id}
                likes={post.likes}
                username={user?.username}
              /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
