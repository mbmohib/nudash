import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import Routes from './routes';
import { store } from './store/store';
import theme from './styles/theme';

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </Provider>
  );
}
