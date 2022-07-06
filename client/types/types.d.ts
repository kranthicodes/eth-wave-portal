interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

type Wave = {
  waver: string;
  timestamp: number;
  message: string;
};

type WaveLogItem = {
  address: string;
  timestamp: string;
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
