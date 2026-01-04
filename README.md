# Snips Mobile App

A React Native mobile application built with TypeScript, featuring Home and Feed pages with content from Snips API.

## Prerequisites

- Node.js >= 18
- Yarn package manager
- React Native development environment set up:
  - For iOS: Xcode and CocoaPods
  - For Android: Android Studio and Android SDK

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   yarn install
   ```

2. **iOS Setup (if developing for iOS):**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Start Metro Bundler:**
   ```bash
   yarn start
   ```

4. **Run on iOS:**
   ```bash
   yarn ios
   ```

5. **Run on Android:**
   ```bash
   yarn android
   ```

## Project Structure

```
snips/
├── src/
│   ├── screens/          # Screen components
│   ├── components/      # Reusable UI components
│   ├── navigation/      # Navigation configuration
│   └── services/        # API services, constants, types
├── App.tsx              # Root app component
├── index.js             # Entry point
└── package.json         # Dependencies and scripts
```

## Technical Stack

- **React Native**: 0.73.2
- **TypeScript**: Strict mode enabled
- **State Management**: React Query (TanStack Query) for server state
- **Navigation**: React Navigation with bottom tabs
- **API Client**: Axios
- **Styling**: StyleSheet with separated style files

## Architecture Decisions

- **Container/Presentational Pattern**: Clear separation between smart and dumb components
- **Folder-based Components**: Each component/screen is a folder with `index.tsx`, `styles.ts`, `types.ts`
- **Type Safety**: Strict TypeScript with no `any` types
- **Performance**: Optimized FlatLists with proper key handling and memoization

## API Endpoints

- Home Page: `https://snips-testing-data.s3.us-east-2.amazonaws.com/homePage.json`
- Feed Page: `https://snips-testing-data.s3.us-east-2.amazonaws.com/FeedPage1.json`

## Development

- Follow TypeScript strict mode
- Use path aliases (`@/`) for imports
- All styles in separate `styles.ts` files
- No inline styles (except dynamic runtime values)
- Follow container/presentational component pattern

