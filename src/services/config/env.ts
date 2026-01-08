let Config: {API_BASE_URL?: string} = {};

try {
  Config = require('react-native-config').default || require('react-native-config');
} catch {
  // Ignore - will use fallback
}

const getApiBaseUrl = (): string => {
  const url = Config.API_BASE_URL || process.env.API_BASE_URL;
  
  if (!url || typeof url !== 'string' || url.trim() === '') {
    throw new Error(
      'API_BASE_URL is not configured. Please set API_BASE_URL in your .env file or environment variables. See example.env for reference.',
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

