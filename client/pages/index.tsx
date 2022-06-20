import type { NextPage } from 'next';
import Head from 'next/head';

import { MessageBox } from '../components/MessageBox';
import WaveList from '../components/WaveList';
import useWaveStore from '../hooks/useWaveStore';
import { styled } from '../stitches.config';

const Home: NextPage = () => {
  const { currentAccount, allWaves, connectWallet, sendWave } = useWaveStore();
  return (
    <Layout>
      <Head>
        <title>Wave Portal</title>
        <meta name='description' content='Say Hello on Blockchain' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box>
        <Heading>Hello👋 from Wave Portal.</Heading>
        <SubHeading>
          Wave at me on the Ethereum blockchain! Maybe add a sweet message too?
          <br />
          Connect your wallet, write your message, and then wave 👋.
        </SubHeading>
        <Box css={{ margin: '0 auto' }}>
          <MessageBox
            sendWave={sendWave}
            account={currentAccount}
            connect={connectWallet}
          />
        </Box>
        <WaveList items={allWaves} />
      </Box>
    </Layout>
  );
};

const Layout = styled('div', {
  display: 'flex',
  maxWidth: '800px',
  margin: '0 auto',
  justifyContent: 'center',
  marginTop: '$3',
  marginBottom: '$3',
});

const Box = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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

export default Home;
