import { ChatAlt2Icon, PencilIcon } from '@heroicons/react/solid';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
import Delete from '../../../components/post/Delete';
import Vote from '../../../components/post/Vote';
import { PostDocument, usePostQuery } from '../../../graphql/generated/graphql';
import { initializeApollo } from '../../../lib/graphql';
import { useUserState } from '../../../store/user';

interface Props {
  //
}

const Post: NextPage<Props> = () => {
  const router = useRouter();
  const [user] = useUserState();
  const { data } = usePostQuery({
    variables: { slug: router.query.slug as string },
  });

  return (
    <div>
      {data?.post && (
        <div className='rounded-md shadow-2xl max-w-4xl mx-auto content-bg'>
          <div className='relative w-full h-[500px]'>
            <Image
              src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=800'
              alt={data.post.title}
              layout='fill'
              objectFit='cover'
              className='w-full object-cover bg-gray-100 rounded-t-lg'
            />
          </div>
          <div className='p-8 rounded-b-md'>
            <div className='flex items-center'>
              <div className='relative h-10 w-10'>
                <Image
                  className='rounded-full'
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                  alt=''
                  layout='fill'
                />
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium capitalize'>
                  {data.post.author.username}
                </div>
                <Moment fromNow className='text-sm gray-400'>
                  {data.post.createdAt}
                </Moment>
              </div>
            </div>
            <div className='flex items-center justify-between my-4'>
              <div className='flex items-center text-md'>
                <ChatAlt2Icon className='ml-2 mr-1 w-5 text-indigo-600' />
                <p>
                  {/* {post.commentsCount} comment{post.commentsCount > 1 && 's'} */}
                  1
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                {user && <Vote post={data.post} user={user} />}
                {user?.username === data.post.author.username && (
                  <Link
                    href='/posts/[slug]/edit'
                    as={`/posts/${data.post.slug}/edit`}
                    passHref
                  >
                    <a className='w-10 h-10 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-500 inline-flex items-center justify-center'>
                      <PencilIcon className='w-6' />
                    </a>
                  </Link>
                )}
                {user?.username === data.post.author.username && (
                  <Delete postId={data.post.id} />
                )}
              </div>
            </div>
            <p className='text-xl sm:text-3xl font-medium'>{data.post.title}</p>
            <p className='mt-4 font-medium gray-300'>{data.post.body}</p>
          </div>
          <hr />
          <div className='p-8'>
            <h5 className='text-xl font-semibold'>Comments(1)</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = initializeApollo();
  await client.query({ query: PostDocument, variables: { slug: query.slug } });

  return { props: { initialApolloState: client.cache.extract() } };
};
