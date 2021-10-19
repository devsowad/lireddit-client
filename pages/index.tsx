import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { PostsDocument, usePostsQuery } from '../generated/graphql';
import { client } from '../lib/graphql';

const Home: NextPage<{}> = () => {
  const { data } = usePostsQuery();

  return (
    <div className=''>
      <div className='flex justify-between'>
        <h1 className='text-3xl md:text-4xl font-medium'>Posts</h1>
        <Link href='/posts/create' passHref>
          <a className='btn outline'>Create post</a>
        </Link>
      </div>
      {data?.posts.map((post) => (
        <h1 key={post.id}>{post.title}</h1>
      ))}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query({ query: PostsDocument });

  return { props: { initialApolloState: client.cache.extract() } };
};
