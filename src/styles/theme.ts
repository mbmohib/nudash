import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = {
  heading: 'Lexend',
  body: 'Lexend',
};

export const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  primary: '#8C2CE2',
  'secondary.100': '#2D2D6A',
  'secondary.400': '#191934',
  'secondary.500': '#141430',
  'secondary.600': '#101026',
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

const fontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '22px',
  '2xl': '22px',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

const styles = {
  global: {
    body: {
      bg: colors['secondary.600'],
      color: colors.white,
      fontSize: fontSizes.md,
    },
    a: {
      color: colors.white,
      _hover: {
        textDecoration: 'none',
        color: colors.primary,
      },
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: '16px',
      paddingLeft: '0',
      paddingInlineEnd: 0,
    },
    sizes: {
      md: {},
    },
    variants: {
      solid: ({ colorMode }: { colorMode: string }) => ({
        padding: '0 24px',
        bg:
          colorMode === 'dark'
            ? 'radial-gradient(115.93% 115.93% at 50% 50%, #8E2DE2 0%, #4A00E0 100%)'
            : 'red.500',
        _hover: {
          bg:
            colorMode === 'dark'
              ? 'radial-gradient(115.93% 115.93% at 80% 80%, #8E2DE2 0%, #4A00E0 100%)'
              : 'red.500',
        },
      }),
      outline: ({ colorMode }: { colorMode: string }) => ({
        padding: '0 24px',
        border: '2px solid',
        borderColor: colorMode === 'dark' ? '#8C2CE2' : 'red.500',
        color: colorMode === 'dark' ? '#8C2CE2' : 'red.500',
        _hover: {
          bg: colorMode === 'dark' ? colors.primary : 'red.500',
          color: colorMode === 'dark' ? colors.white : 'red.500',
        },
      }),
      icon: ({ colorMode }: { colorMode: string }) => ({
        bg: 'transparent',
        padding: 1,
        color: colorMode === 'dark' ? colors.white : 'red.500',
        _hover: {
          color: colorMode === 'dark' ? colors.primary : 'red.500',
        },
      }),
    },
  },
  Input: {
    sizes: {
      md: {
        field: {
          paddingLeft: '16px',
          paddingRight: '16px',
          borderRadius: '16px',
        },
      },
    },
    variants: {
      outline: ({ colorMode }: { colorMode: string }) => ({
        borderColor: colors['secondary.100'],
      }),
    },
    defaultProps: {
      borderColor: 'red',
    },
  },
  Textarea: {
    variants: {
      outline: {
        paddingInlineStart: 2,
        paddingInlineEnd: 2,
        borderRadius: '4px',
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'normal',
    },
  },
};

export default extendTheme({
  config,
  styles,
  fonts,
  fontSizes,
  colors,
  space,
  radii,
  shadows,
  zIndices,
  components,
});
