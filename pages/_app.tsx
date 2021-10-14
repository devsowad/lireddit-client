import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { client } from '../apollo-client';
import Header from '../components/Header/Header';
import '../styles/globals.css';

// TODO: Setup apollo client right way
// TODO: Create Post

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Lireddit</title>
      </Head>
      <ApolloProvider client={client}>
        <Header />

        <main className='container px-4 mx-auto py-8'>
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </>
  );
};
export default MyApp;
