import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { styled } from '../../stitches.config';
import PortalBody from '../../components/wagmi/PortalBody';


const Wagmi: NextPage = () => {
  return (
      <Layout>
        <Head>
          <title>Wave Portal</title>
          <meta name='description' content='Say Hello on Blockchain' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <PortalBody />
      </Layout>
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

export default Wagmi;
