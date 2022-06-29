import React from 'react';
import { ethers, providers } from 'ethers';

import abiJson from '../utils/WavePortal.json';

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

type Wave = {
  waver: string;
  timestamp: number;
  message: string;
};

type ExodusEvent = 'accountsChanged' | 'connect' | 'disconnect';

interface EthereumProvider {
  isConnected: boolean | null;
  request: (args: RequestArguments) => Promise<unknown>;
  on: (event: ExodusEvent, handler: (args: any) => void) => void;
  addListener: (event: ExodusEvent, handler: (args: any) => void) => void;
  removeListener: (event: ExodusEvent) => void;
}

const getExodusProvider = (): EthereumProvider | undefined => {
  if ('exodus' in window) {
    const anyWindow: any = window;
    return anyWindow.exodus.ethereum;
  }

  window.open('https://exodus.com', '_blank');
};

export default function useWaveStore() {
  // User input
  const [waveMessage, setWaveMessage] = React.useState('');

  // State updated by listeners
  const [provider, setProvider] = React.useState<providers.Web3Provider | null>(
    null
  );
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [allWaves, setAllWaves] = React.useState<WaveLogItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Contract variables
  // Rinkiby '0x04886e35b126c846BF5842d0d3a4549Cab01eBeE';
  const contractAddress = '0xa0af65e02c8BEa75363F4CdE7066DdB69522c6C9';
  const contractABI = abiJson.abi;

  React.useEffect(() => {
    const onLoad = async () => {
      const exodusProvider = getExodusProvider();
      if (exodusProvider) {
        const provider = new ethers.providers.Web3Provider(exodusProvider);

        setProvider(provider);

        provider.send('eth_accounts', []).then((accounts) => {
          setCurrentAccount(accounts[0]);
        });
      }
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  React.useEffect(() => {
    if (currentAccount) {
      getAllWaves();
    }
  }, [currentAccount]);

  // Connect to metamask
  const connectWallet = async () => {
    if (!provider) {
      window.open('https://exodus.com', '_blank');
      return;
    }

    setLoading(true);

    try {
      const accounts = await provider.send('eth_requestAccounts', []);

      setCurrentAccount(accounts[0]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const sendWave = async () => {
    const signer = provider?.getSigner(currentAccount);
    const waveportalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    setLoading(true);

    try {
      const tx = await waveportalContract.wave(waveMessage, {
        gasLimit: 150000,
      });

      console.log(
        `You can view your transaction at https://rinkeby.etherscan.io/tx/${tx.hash}`
      );

      await tx.wait();

      setWaveMessage('');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getAllWaves = async () => {
    const signer = provider?.getSigner();

    const waveportalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const waves = await waveportalContract.getAllWaves();

    let wavesCleaned: WaveLogItem[] = [];

    waves.forEach((wave: Wave) => {
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000) as unknown as string,
        message: wave.message,
      });
    });

    setAllWaves(wavesCleaned);
  };

  return {
    currentAccount,
    allWaves,
    loading,
    waveMessage,
    connectWallet,
    sendWave,
    setWaveMessage,
  };
}
