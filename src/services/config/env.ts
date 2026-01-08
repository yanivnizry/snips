let Config: {API_BASE_URL?: string} = {};

try {
  Config = require('react-native-config').default || require('react-native-config');
} catch {
  // Ignore - will use fallback
}

const DEFAULT_API_BASE_URL = 'https://snips-testing-data.s3.us-east-2.amazonaws.com';

const getApiBaseUrl = (): string => {
  const url = Config.API_BASE_URL || process.env.API_BASE_URL;
  
  if (!url || typeof url !== 'string' || url.trim() === '') {
    if (__DEV__) {
      console.warn(
        'API_BASE_URL is not configured. Using default development URL:',
        DEFAULT_API_BASE_URL,
      );
      return DEFAULT_API_BASE_URL;
    }
    throw new Error(
      'API_BASE_URL is not configured. Please set API_BASE_URL in your .env file or environment variables.',
    );
  }

  const trimmedUrl = url.trim();
  
  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    throw new Error(
      'API_BASE_URL must be a valid URL starting with http:// or https://',
    );
  }

  return trimmedUrl;
};

export const API_BASE_URL = getApiBaseUrl();

