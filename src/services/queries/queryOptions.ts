export const QUERY_TIME = {
  STALE_TIME: {
    DEFAULT: 2 * 60 * 1000,
    HOME_PAGE: 5 * 60 * 1000,
  },
  GC_TIME: {
    DEFAULT: 5 * 60 * 1000,
    LONG: 10 * 60 * 1000,
  },
} as const;

export const QUERY_BEHAVIOR = {
  REFETCH_ON_WINDOW_FOCUS: false,
  REFETCH_ON_MOUNT: {
    DEFAULT: true,
    INFINITE_FEED: false,
  },
  RETRY: {
    DEFAULT: 3,
    INFINITE_FEED: 2,
  },
} as const;

export const DEFAULT_QUERY_OPTIONS = {
  staleTime: QUERY_TIME.STALE_TIME.DEFAULT,
  gcTime: QUERY_TIME.GC_TIME.DEFAULT,
  refetchOnWindowFocus: QUERY_BEHAVIOR.REFETCH_ON_WINDOW_FOCUS,
  refetchOnMount: QUERY_BEHAVIOR.REFETCH_ON_MOUNT.DEFAULT,
  retry: QUERY_BEHAVIOR.RETRY.DEFAULT,
} as const;

