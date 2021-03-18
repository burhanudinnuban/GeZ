import 'react-native-gesture-handler';
import React from 'react';
import {persistor, store} from './configs/redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import PageRoot from './configs/pageRoot';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PageRoot />
        </NavigationContainer>
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
