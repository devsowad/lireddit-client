import type { NextPage } from 'next';
import Link from 'next/link';
import { PostsDocument, useMeQuery, usePostsQuery } from '../generated/graphql';
import { client } from '../lib/graphql';

const Home: NextPage<{}> = () => {
  const { data } = usePostsQuery();
  const { data: user } = useMeQuery();

  return (
    <div className=''>
      <div className='flex justify-between'>
        <h1 className='text-3xl md:text-4xl font-medium'>Posts</h1>
        {user?.me && (
          <Link href='/posts/create' passHref>
            <a className='btn outline'>Create post</a>
          </Link>
        )}
      </div>
      {data?.posts.map((post) => (
        <div key={post.id} className='p-4 mb-4 mt-2 bg-gray-600 rounded-md'>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  client.cache.reset();
  await client.query({ query: PostsDocument });

  return { props: { initialApolloState: client.cache.extract() } };
};
