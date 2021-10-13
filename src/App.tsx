import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Routes from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </Provider>
  );
}
