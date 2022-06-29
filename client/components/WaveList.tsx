import React from 'react';

import { styled } from '../stitches.config';

interface Props {
  items: WaveLogItem[];
}

export default function WaveList({ items }: Props) {
  return (
    <Container>
      <Heading>Wave log 👀</Heading>
      <SubHeading>Check out all these people out here waving!</SubHeading>
      {items.map(({ address, timestamp, message }, idx) => (
        <WaveLogContainer key={idx}>
          <WaveLogItem>
            <ItemHeading>Waver</ItemHeading>
            <ItemValue
              href={`https://etherscan.io/address/${address}`}
              as='a'
              target='_blank'
              color='blue'
            >
              {address.slice(0, 4)}...
              {address.slice(address.length - 4, address.length)}
            </ItemValue>
          </WaveLogItem>
          <WaveLogItem>
            <ItemHeading>Waved at</ItemHeading>
            <ItemValue type='timestamp'>{timestamp.toString()}</ItemValue>
          </WaveLogItem>
          <WaveLogItem type='message'>
            <ItemHeading>Message</ItemHeading>
            <ItemValue>{message}</ItemValue>
          </WaveLogItem>
        </WaveLogContainer>
      ))}
      {!items.length && (
        <SubHeading
          css={{ textAlign: 'center', marginTop: '$4', color: 'red' }}
        >
          No waves found
        </SubHeading>
      )}
    </Container>
  );
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '$4 0',
  margin: '0 auto',
});

const Heading = styled('h1', {
  fontSize: '$6',
  fontWeight: 800,
  lineHeight: '$4',
  padding: '$3 0',
  textAlign: 'left',
  color: '$grey800',
});

const SubHeading = styled('p', {
  fontSize: '$3',
});

const WaveLogContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  border: '2px solid $purple400',
  margin: '$3 0',
});

const WaveLogItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$3',
  variants: {
    type: {
      message: {
        width: '16rem',
      },
    },
  },
});

const ItemHeading = styled('p', {
  fontWeight: 700,
  fontSize: '$4',
  lineHeight: '$4',
});

const ItemValue = styled('p', {
  fontSize: '18px',
  padding: '$2',
  lineHeight: '$4',
  variants: {
    color: {
      blue: {
        color: '$blue400',
      },
    },
    type: {
      timestamp: {
        maxWidth: '28rem',
      },
    },
  },
});
