import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { styled } from '../stitches.config';

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Ethers',
    path: '/',
  },
  {
    id: 2,
    name: 'Wagmi',
    path: '/wagmi',
  },
];

export default function NavBar() {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path ? 'active' : undefined;
  };

  return (
    <NavContainer>
      <NavMenu>
        {MENU_ITEMS.map((menuItem) => (
          <NavItem key={menuItem.id} variant={isActive(menuItem.path)}>
            <Link href={menuItem.path}>{menuItem.name}</Link>
          </NavItem>
        ))}
      </NavMenu>
    </NavContainer>
  );
}

const NavContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row-reverse',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  minHeight: '65px',
  //   border: 'solid 1px black',
  padding: '0 $5',
});

const NavMenu = styled('div', {
  display: 'flex',
  gap: '$3',
});

const NavItem = styled('div', {
  borderColor: '$grey800',
  borderStyle: 'solid',
  borderWidth: '0 2px 2px 2px',
  padding: '$1 $3',
  fontSize: '1rem',
  letterSpacing: '1px',
  boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.55)',
  cursor: 'pointer',
  '&:hover': {
    background: 'black',
    color: 'white',
    boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.55)',
    transition: 'all 0.5s ease',
  },
  variants: {
    variant: {
      active: {
        background: 'black',
        color: 'white',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.55)',
      },
    },
  },
});
