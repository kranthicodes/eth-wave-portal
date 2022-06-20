import { createStitches } from '@stitches/react';

export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    colors: {
      grey: '#9e9e9e',
      grey100: '#f5f5f5',
      grey200: '#fefefe',
      grey300: '#eeeeee',
      grey400: '#bdbdbd',
      grey500: '#9e9e9e',
      grey600: '#757575',
      grey700: '#616161',
      grey800: '#424242',
      grey900: '#212121',
      purpule200: '#ce93d8',
      purple300: '#ba68c8',
      purple400: '#ab47bc',
      blue: '#2196f3',
      blue200: '#90caf9',
      blue300: '#64b5f6',
      blue400: '#42a5f5',
      blue500: '#2196f3',
    },
    fonts: {
      sans: 'Inter, sans-serif',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '60px',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
    },
    radii: {
      1: '2px',
      2: '4px',
      3: '8px',
      round: '9999px',
    },
  },
});

const GlobalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    font: '14px Inter',
    boxSizing: 'border-box',
  },
  html: {
    fontSize: '16px',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

GlobalStyles();
