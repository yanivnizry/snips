import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import NavigationContainer from './src/navigation/NavigationContainer';
import HomeScreen from '@/screens/home';
import FeedScreen from '@/screens/feed';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

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

