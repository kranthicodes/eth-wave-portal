import type { NextPage } from 'next';
import Head from 'next/head';

import { MessageBox } from '../components/MessageBox';
import NavBar from '../components/NavBar';
import WaveList from '../components/WaveList';
import useWaveStore from '../hooks/useWaveStore';
import { styled } from '../stitches.config';

const Home: NextPage = () => {
  const {
    currentAccount,
    allWaves,
    waveMessage,
    connectWallet,
    sendWave,
    setWaveMessage,
  } = useWaveStore();
  
  return (
    <Layout>
      <Head>
        <title>Wave Portal</title>
        <meta name='description' content='Say Hello on Blockchain' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />
      <Box>
        <Heading>Hello👋 from Wave Portal.</Heading>
        <SubHeading>
          Wave at me on the Ethereum blockchain! Maybe add a message too?
          <br />
          Connect your wallet, write your message, and then wave 👋.
        </SubHeading>
        <SubHeading css={{ paddingTop: 0 }}>
          Ethers status:{' '}
          {currentAccount ? (
            <StatusLabel color='success'>
              connected to Exodus provider
            </StatusLabel>
          ) : (
            <StatusLabel color='danger'>disconnected</StatusLabel>
          )}
        </SubHeading>
        <Box css={{ margin: '0 auto' }}>
          <MessageBox
            waveMessage={waveMessage}
            setWaveMessage={setWaveMessage}
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
  flexDirection: 'column',
  maxWidth: '800px',
  margin: '0 auto',
  justifyContent: 'center',
  marginTop: `calc($3 + 65px)`,
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

const StatusLabel = styled('span', {
  fontSize: '1.1rem',
  letterSpacing: '1px',
  variants: {
    color: {
      success: {
        color: 'green',
      },
      danger: {
        color: 'red',
      },
    },
  },
});

export default Home;
