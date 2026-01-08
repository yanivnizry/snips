import {QueryClient} from '@tanstack/react-query';
import {DEFAULT_QUERY_OPTIONS} from './queryOptions';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...DEFAULT_QUERY_OPTIONS,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

