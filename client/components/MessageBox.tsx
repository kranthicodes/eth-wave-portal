import { styled } from '../stitches.config';

export const MessageBox = ({ connect, account }: any) => {
  if (!account)
    return (
      <ConnectBtn onClick={() => connect()}>Connect to Metamask</ConnectBtn>
    );
  return <div>dsa</div>;
};

const ConnectBtn = styled('button', {
  padding: '$3',
  border: '1px solid black',
  background: 'white',
  fontSize: '$3',
  cursor: 'pointer',
});
