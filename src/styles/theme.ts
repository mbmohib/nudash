import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: '#1b1c30',
      color: 'white',
    },
    // styles for the `a`
    a: {
      color: 'teal.500',
      _hover: {
        textDecoration: 'none',
        color: 'teal.700',
      },
    },
  },
};

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  primary: '#51459f',
  secondary: '#23243d',
  tertiary: '#2e3039',
};

const space = {
  px: '1px',
  0.5: '4px',
  1: '8px',
  2: '16px',
  3: '32px',
  4: '40px',
  5: '48px',
  6: '56px',
  7: '62px',
  8: '80px',
  9: '88px',
  10: '100px',
};

const radii = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '48px',
  full: '9999px',
};

export const theme = extendTheme({
  styles,
  colors,
  space,
  radii,
});
