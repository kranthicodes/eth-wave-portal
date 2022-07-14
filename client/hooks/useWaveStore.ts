import React from 'react';
import Web3 from 'web3';

import abiJson from '../utils/WavePortal.json';

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
  const [provider, setProvider] = React.useState<any>(
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
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  React.useEffect(() => {
    if (currentAccount) {
      getAllWaves();
    }
  }, [currentAccount]);

  const onLoad = async () => {
    const exodusProvider = getExodusProvider();
    if (exodusProvider) {
      const provider = new Web3(Web3.givenProvider);

      setProvider(provider);

      const accounts = await provider.eth.requestAccounts();
      setCurrentAccount(accounts[0]);
    }
  };

  // Connect to metamask
  const connectWallet = async () => {
    if (!provider) {
      onLoad();
      return;
    }

    setLoading(true);

    try {
      const accounts = await provider.eth.getAccounts();

      setCurrentAccount(accounts[0]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const sendWave = async () => {
    // const signer = provider?.getSigner(currentAccount);
    // const waveportalContract = new ethers.Contract(
    //   contractAddress,
    //   contractABI,
    //   signer
    // );
    //
    // setLoading(true);
    //
    // try {
    //   const tx = await waveportalContract.wave(waveMessage, {
    //     gasLimit: 150000,
    //   });
    //
    //   console.log(
    //     `You can view your transaction at https://rinkeby.etherscan.io/tx/${tx.hash}`
    //   );
    //
    //   await tx.wait();
    //
    //   setWaveMessage('');
    //   setLoading(false);
    // } catch (err) {
    //   console.log(err);
    //   setLoading(false);
    // }
  };

  const getAllWaves = async () => {
    // const signer = provider?.getSigner();
    //
    // const waveportalContract = new ethers.Contract(
    //   contractAddress,
    //   contractABI,
    //   signer
    // );
    //
    // const waves = await waveportalContract.getAllWaves();
    //
    // let wavesCleaned: WaveLogItem[] = [];
    //
    // waves.forEach((wave: Wave) => {
    //   wavesCleaned.push({
    //     address: wave.waver,
    //     timestamp: new Date(wave.timestamp * 1000) as unknown as string,
    //     message: wave.message,
    //   });
    // });
    //
    // setAllWaves(wavesCleaned);
  };

  const testProxyRequests = async (address: string) => {
    const requests: Set<any> = new Set([
        ['getHashrate', []],
        ['getGasPrice', [], (gasPrice: unknown) => typeof gasPrice === 'string'],
        ['getFeeHistory', [100, 15127496, [0, 0.5, 1, 1.5, 3, 80]]],
        ['getAccounts', [], (accounts: unknown) => Array.isArray(accounts)],
        ['getBlockNumber', [], (blockNumber: unknown) => Number.isFinite(blockNumber)],
        ['getBalance', ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', 'pending'], (balance: unknown) => typeof balance === 'string' && Number.isFinite(parseInt(balance, 10))],
        ['getStorageAt', ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', 100], (code: unknown) => typeof code === 'string'],
        ['getCode', ['0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8'], (code: unknown) => typeof code === 'string'],
        ['getBlock', [3150], (block: unknown) => typeof block === 'object'],
        ['getBlockTransactionCount', [15128519], (count: unknown) => Number.isFinite(count)],
        ['getBlockTransactionCount', ['0x3b4f2835bd7241b09398a4b4ca77ecdb27161b6bcf1297a39856de145dca1d5e'], (count: unknown) => Number.isFinite(count)],
        ['getBlockUncleCount', ['0x504faf050d65d5e0bb5ca908600f134c47a957eb81fc2e3ec1617a642d78f465'], (count: unknown) => Number.isFinite(count)],
        ['getUncle', ['0x3b4f2835bd7241b09398a4b4ca77ecdb27161b6bcf1297a39856de145dca1d5e', 0], (uncle: unknown) => typeof uncle === 'object'],
        ['getUncle', ['15128519', 0], (uncle: unknown) => typeof uncle === 'object'],
        ['getTransaction', ['0xd50c3689388849cf15011ed6cd120f087be95c0a36e4148ad8137430e3d5d444'], (transaction: unknown) => typeof transaction === 'object'],
        ['getPendingTransactions', [], (transactions: unknown) => Array.isArray(transactions)],
        ['getTransactionFromBlock', ["0x0a4a008970bd2dc2365133b63dd142d6e5222cdd4b8bda4d5095f0930b98f8fe", 0], (transaction: unknown) => typeof transaction === 'object'],
        ['getTransactionFromBlock', [15129830, 0], (transaction: unknown) => typeof transaction === 'object'],
        ['getTransactionReceipt', ['0xd50c3689388849cf15011ed6cd120f087be95c0a36e4148ad8137430e3d5d444'], (transaction: unknown) => typeof transaction === 'object'],
        ['getTransactionCount', ['0xfc836d3dbbc9fa04bb80bd71a6780156ed71eb58'], (count: unknown) => Number.isFinite(count)],
        ['sign', ['Hello world', address], (signature: unknown) => typeof signature === 'string' && signature.startsWith('0x')],
        ['call', [{ to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"}], (callResult: unknown) => typeof callResult === 'string' && callResult.startsWith('0x')],
        ['estimateGas', [{ to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003" }], (callResult: unknown) => Number.isFinite(callResult)],
        ['getPastLogs', [{ fromBlock: 15000000, toBlock: 15000100, address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', topics: [] }], (logs: unknown) => Array.isArray(logs)],
        ['getWork', [], (workArray: unknown) => Array.isArray(workArray)],
        ['submitWork', ["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000"], (result: unknown) => typeof result === 'boolean'],
        ['requestAccounts', [], (accounts: unknown) => Array.isArray(accounts)],
        ['getChainId', [], (chainId: unknown) => Number.isFinite(chainId)],
        ['getNodeInfo', [], (info: unknown) => typeof info === 'string'],
        ['getProof', ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", [], 15000000], (proof: unknown) => typeof proof === 'object'],
        ['createAccessList', [{ to:"0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", from:"0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe" }], (proof: unknown) => typeof proof === 'object'],
    ])

    const total = requests.size
    let sucessfullRequests = 0
    let failedRequests = 0

    // @ts-ignore
    for (const [method, params, checkFn = () => true] of requests) {
      try {
        let response
        if (params.length) {
          response = await provider.eth[method](...params)
        } else {
          response = await provider.eth[method]()
        }
        if (!checkFn(response)) throw new Error(`Unexpected ${method} response: ${response}`)

        console.log(`Checking method: ${++sucessfullRequests} / ${total}`)
      } catch (e: any) {
        if (method === 'getWork' && e.message.includes('no mining work available yet')) {
          sucessfullRequests++
          continue
        }

        failedRequests++
        console.error(`Method ${method} failed with params ${params}: ${e.message}`)
      }
    }

    console.log(`${sucessfullRequests} / ${total} requests succeeded`)
  }

  const sendOrSignTransaction = async (address: string, method = 'signTransaction') => {
    try {
      const params = {
        from: address,
        to: address,
        value: 0,
        gas: 21000,
        accessList: ['0xbCdFCD70cd9E4F11Ae711F371cA11719BD1EBc32'],
        chain: 'mainnet',
        hardfork: 'london',
        common: {
          customChain: {
            name: 'Custom Chain',
            networkId: '0x100500',
            chainId: '0x100500'
          },
        },
        type: '0x2'
      }
      console.log(`Using params: ${JSON.stringify(params)}`)

      const result = await provider.eth[method](params)
      alert(`Result: ${JSON.stringify(result.transactionHash || result)}`)
    } catch (e: any) {
      alert(`Not sent: ${e.message}`)
    }
  }

  return {
    currentAccount,
    allWaves,
    loading,
    waveMessage,
    connectWallet,
    sendWave,
    setWaveMessage,
    testProxyRequests,
    sendOrSignTransaction,
  };
}
