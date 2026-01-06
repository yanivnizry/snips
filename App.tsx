import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';
import NavigationContainer from './src/navigation/NavigationContainer';
import {queryClient} from './src/services/queries/queryClient';

const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;

