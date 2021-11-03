import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: '#101026',
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

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const components = {
  Button: {
    // 1. We can update the base styles
    baseStyle: {
      borderRadius: '12px',
    },
    // 2. We can add a new button size or extend existing
    // sizes: {
    //   xl: {
    //     h: "56px",
    //     fontSize: "lg",
    //     px: "32px",
    //   },
    // },
    // 3. We can add a new visual variant
    variants: {
      // 4. We can override existing variants
      solid: (props: any) => ({
        bg:
          props.colorMode === 'dark'
            ? 'linear-gradient(82.17deg, #2D2D6A 0%, #5C1594 96.26%)'
            : 'red.500',
        _hover: {
          bg:
            props.colorMode === 'dark'
              ? 'linear-gradient(82.17deg, #2D2D6A 2%, #5C1594 60.26%)'
              : 'red.500',
        },
      }),
    },
  },
};

export const theme = extendTheme({
  config,
  styles,
  fonts,
  colors,
  space,
  radii,
  shadows,
  zIndices,
  components,
});
