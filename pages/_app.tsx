import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header/Header';
import { useApollo } from '../lib/graphql';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);
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
