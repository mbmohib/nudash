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
        textDecoration: 'underline',
      },
    },
  },
}

const colors = {
  primary: '#51459f',
  secondary: '#23243d',
}

const overrides = {
  styles,
  colors,
}

export const theme = extendTheme(overrides)
