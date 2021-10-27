import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #141430;',
      color: 'white',
    },
    // styles for the `a`
    a: {
      color: 'white',
      _hover: {
        textDecoration: 'none',
        color: 'teal.700',
      },
    },
  },
};

const fonts = {
  heading: 'Zen Kaku Gothic Antique',
  body: 'Zen Kaku Gothic Antique',
};

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  primary: '#51459f',
  secondary100: '#2D2D6A',
  secondary400: '#191934',
  secondary500: '#141430',
  secondary600: '#101026',
  secondary1000:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), #141430',
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

const shadows = {
  md: '0px 1px 8px rgba(0, 0, 0, 0.16)',
};

export const theme = extendTheme({
  styles,
  fonts,
  colors,
  space,
  radii,
  shadows,
});
