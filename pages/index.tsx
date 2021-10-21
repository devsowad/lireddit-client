import type { NextPage } from 'next';
import Link from 'next/link';
import Posts from '../components/post/Posts';
import { PostsDocument, usePostsQuery } from '../graphql/generated/graphql';
import { initializeApollo } from '../lib/graphql';
import { useUserState } from '../store/user';

const Home: NextPage<{}> = () => {
  const { data } = usePostsQuery();
  const [user] = useUserState();

  return (
    <>
      <div className='flex justify-between mb-8'>
        <h1 className='text-3xl md:text-4xl font-medium'>Posts</h1>
        {user && (
          <Link href='/posts/create' passHref>
            <a className='btn outline'>Create post</a>
          </Link>
        )}
      </div>
      {data && <Posts data={data} />}
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const client = initializeApollo();
  await client.query({ query: PostsDocument });

  return { props: { initialApolloState: client.cache.extract() } };
};
