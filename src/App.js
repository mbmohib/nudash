import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from 'routes/routes';
import Theme from 'styles';
import store, { persistor } from 'store/store';
import { PreLoader } from 'views/ui';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<PreLoader />} persistor={persistor}>
        <Theme>
          <Routes />
        </Theme>
      </PersistGate>
    </Provider>
  );
}
