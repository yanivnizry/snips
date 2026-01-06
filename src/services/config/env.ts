/**
 * Environment configuration
 * 
 * To use environment variables:
 * 1. Install: yarn add react-native-config
 * 2. Create .env file in project root with: API_BASE_URL=your_url
 * 3. For iOS: cd ios && pod install && cd ..
 * 4. Restart Metro bundler
 */

let Config: {API_BASE_URL?: string} = {};

try {
  // Try to use react-native-config if available
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Config = require('react-native-config').default || require('react-native-config');
} catch {
  // react-native-config not installed, will use fallback
}

export const API_BASE_URL =
  Config.API_BASE_URL || process.env.API_BASE_URL;

