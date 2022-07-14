import { styled } from '../stitches.config';

export const ProxyBox = ({
  account,
  testProxyRequests,
  sendOrSignTransaction
}: any) => {
  return (
    <MessageAreaWrapper>
      <WaveButton onClick={() => testProxyRequests(account)}>Test proxying requests</WaveButton>
      <WaveButton onClick={() => sendOrSignTransaction(account, 'sendTransaction')}>Send transaction</WaveButton>
      <WaveButton onClick={() => sendOrSignTransaction(account, 'signTransaction')}>Sign transaction</WaveButton>
    </MessageAreaWrapper>
  );
};

const MessageAreaWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const WaveButton = styled('button', {
    padding: '$2',
    border: '1px solid black',
    background: 'white',
    fontSize: '$3',
});
