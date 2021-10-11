import { extendTheme } from '@chakra-ui/react'

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
}

const colors = {
  primary: '#51459f',
  secondary: '#23243d',
  tertiary: '#2e3039',
}

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
}

const overrides = {
  styles,
  colors,
  space,
}

export const theme = extendTheme(overrides)
