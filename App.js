/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { AuthProvider, WebRTCProvider } from './src/context'
import { AppNavigation } from './src/navigation';


const App = () => {

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider >
  );
};

export default App;
