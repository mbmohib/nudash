import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme'
import { store } from './store/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <h1>Hello TypeScript!</h1>
      </ChakraProvider>
    </Provider>
  )
}
