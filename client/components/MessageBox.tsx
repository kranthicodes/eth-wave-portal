import { styled } from '../stitches.config';

export const MessageBox = ({
  connect,
  account,
  sendWave,
  waveMessage,
  setWaveMessage,
}: any) => {
  if (!account)
    return <ConnectBtn onClick={() => connect()}>Connect to Exodus</ConnectBtn>;
  return (
    <MessageAreaWrapper>
      <TextArea
        value={waveMessage}
        onChange={(evt) => setWaveMessage(evt.target.value)}
        placeholder='Enter your message here :)'
      ></TextArea>
      <WaveButton disabled={!waveMessage.length} onClick={sendWave}>
        Wave at me!
      </WaveButton>
    </MessageAreaWrapper>
  );
};

const ConnectBtn = styled('button', {
  padding: '$3',
  border: '1px solid black',
  background: 'white',
  fontSize: '$3',
  cursor: 'pointer',
});

const MessageAreaWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const TextArea = styled('textarea', {
  padding: '$2',
  border: '2px solid $grey300',
  resize: 'none',
  width: '24rem',
  height: '12rem',
  margin: '$3 0',
});

const WaveButton = styled('button', {
  padding: '$2',
  border: '1px solid black',
  background: 'white',
  fontSize: '$3',
});
