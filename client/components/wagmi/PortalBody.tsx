import React from 'react';
import type { NextPage } from 'next';
import {
  useAccount,
  useConnect,
  useContractRead,
  useDisconnect,
  useContractWrite,
} from 'wagmi';

import { MessageBox } from '../MessageBox';
import NavBar from '../NavBar';
import WaveList from '../WaveList';
import { styled } from '../../stitches.config';
import abiJson from '../../utils/WavePortal.json';

const contractAddress = '0xa0af65e02c8BEa75363F4CdE7066DdB69522c6C9';
const contractABI = abiJson.abi;

const PortalBody: NextPage = () => {
  const [waveMessage, setWaveMessage] = React.useState('');
  const [allWaves, setAllWaves] = React.useState<WaveLogItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect({
    onError(error) {
      disconnect();
      connectHandler();
    },
  });
  // const { data: signer, isError, isLoading } = useSigner();
  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    functionName: 'getAllWaves',
  });
  const { write: wave, data: waveResponse } = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    functionName: 'wave',
    args: [waveMessage],
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides });
    },
  });

  const { connector: activeConnector, isConnected } = useAccount();

  React.useEffect(() => {
    getAllWaves();
  }, []);

  const sendWave = async () => {
    setLoading(true);

    try {
      const tx = wave();
      console.log({ tx });
      setWaveMessage('');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  console.log({ waveResponse });

  const getAllWaves = async () => {
    const waves = data;

    let wavesCleaned: WaveLogItem[] = [];

    waves?.forEach((wave: Wave) => {
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000) as unknown as string,
        message: wave.message,
      });
    });

    setAllWaves(wavesCleaned);
  };

  const connectHandler = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <>
      <NavBar />
      <Box>
        <Heading>Hello👋 from Wave Portal.</Heading>
        <SubHeading>
          Wave at me on the Ethereum blockchain! Maybe add a message too?
          <br />
          Connect your wallet, write your message, and then wave 👋.
        </SubHeading>
        <SubHeading css={{ paddingTop: 0 }}>
          Wagmi status:{' '}
          {activeConnector ? (
            <StatusLabel color='success'>
              connected to {activeConnector.name}
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
            account={isConnected}
            connect={connectHandler}
          />
        </Box>
        <WaveList items={allWaves} />
      </Box>
    </>
  );
};

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

export default PortalBody;
