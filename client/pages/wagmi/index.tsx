import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { configureChains, chain, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { styled } from '../../stitches.config';
import PortalBody from '../../components/wagmi/PortalBody';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);
const client = createClient({
  autoConnect: true,
  provider,
});

const Wagmi: NextPage = () => {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Head>
          <title>Wave Portal</title>
          <meta name='description' content='Say Hello on Blockchain' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <PortalBody />
      </Layout>
    </WagmiConfig>
  );
};

const Layout = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '800px',
  margin: '0 auto',
  justifyContent: 'center',
  marginTop: `calc($3 + 65px)`,
  marginBottom: '$3',
});

const Heading = styled('h1', {
  fontSize: '$7',
  fontWeight: 800,
  padding: '$4 0',
  textAlign: 'center',
});

const SubHeading = styled(Heading, {
  fontWeight: 'normal',
  fontSize: '$4',
  color: '$grey700',
  lineHeight: 1.5,
});

export default Wagmi;
