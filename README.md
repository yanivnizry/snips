# Snips Mobile App

A React Native mobile application built with TypeScript, featuring Home and Feed pages with content from Snips API. The app provides a modern, performant mobile experience with optimized list rendering, infinite scrolling, and responsive design.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Technical Stack](#technical-stack)
- [Architecture Decisions](#architecture-decisions)
- [Performance Optimizations](#performance-optimizations)
- [API Endpoints](#api-endpoints)
- [Development Guidelines](#development-guidelines)
- [Assumptions](#assumptions)

## Prerequisites

- **Node.js** >= 18
- **Yarn** package manager (or npm)
- **React Native development environment** set up:
  - For **iOS**: Xcode 14+ and CocoaPods
  - For **Android**: Android Studio and Android SDK (API level 21+)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd snips
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
API_BASE_URL=https://snips-testing-data.s3.us-east-2.amazonaws.com
```

Alternatively, you can set the `API_BASE_URL` environment variable directly.

### 4. iOS Setup (if developing for iOS)

```bash
cd ios && pod install && cd ..
```

### 5. Start Metro Bundler

```bash
yarn start
```

### 6. Run the Application

**For iOS:**
```bash
yarn ios
```

**For Android:**
```bash
yarn android
```

## Project Structure

```
snips/
├── src/
│   ├── assets/              # Images, fonts, and static assets
│   │   ├── fonts/          # Custom font files
│   │   └── images/         # Image assets
│   ├── components/         # Reusable UI components
│   │   ├── Card/          # Card component for displaying titles
│   │   ├── HorizontalList/ # Horizontal scrolling list component
│   │   ├── SnipsImage/    # Custom image component with loading states
│   │   └── ExploreMoreCard/ # Special card for "explore more" section
│   ├── navigation/        # Navigation configuration
│   │   ├── NavigationContainer.tsx
│   │   ├── TabNavigator.tsx
│   │   └── NavigationTypes.ts
│   ├── screens/           # Screen components
│   │   ├── Home/          # Home screen with featured content
│   │   │   ├── components/ # Screen-specific components
│   │   │   └── hooks/     # Custom hooks for Home screen
│   │   └── Feed/          # Feed screen with infinite scroll
│   │       └── components/ # Screen-specific components
│   ├── services/          # Business logic and API services
│   │   ├── apis/         # API client and endpoints
│   │   ├── config/       # Configuration (environment variables)
│   │   ├── constants/    # App-wide constants (colors, spacing, etc.)
│   │   ├── queries/      # React Query hooks and configuration
│   │   └── types/        # TypeScript type definitions
│   ├── types/            # Global type definitions
│   └── utils/            # Utility functions
├── App.tsx               # Root app component
├── index.js              # Entry point
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Technical Stack

### Core Framework
- **React Native**: 0.83.0
- **React**: 19.2.0
- **TypeScript**: 5.6.3 (strict mode enabled)

### State Management
- **TanStack Query (React Query)**: v5.17.9
  - Used for server state management (API data fetching, caching, synchronization)
  - Provides built-in loading states, error handling, and caching strategies
  - Enables infinite scrolling with `useInfiniteQuery` hook

### Navigation
- **React Navigation**: v6.1.9
  - Bottom tab navigator for main app navigation
  - Type-safe navigation with TypeScript

### API & Networking
- **Axios**: v1.6.5
  - HTTP client with interceptors for error handling
  - Centralized API configuration

### Styling
- **StyleSheet API**: Native React Native styling
- **React Native Linear Gradient**: For gradient overlays
- All styles separated into dedicated `styles.ts` files

### Additional Libraries
- **React Native Safe Area Context**: For handling device safe areas
- **React Native Gesture Handler**: For smooth gesture interactions
- **React Native Screens**: For native screen management

## Architecture Decisions

### 1. Component Organization
- **Folder-based Structure**: Each component/screen is organized in its own folder with:
  - `index.tsx`: Component logic
  - `styles.ts`: All styling (no inline styles)
  - `types.ts`: TypeScript interfaces (when needed)
- **Separation of Concerns**: Clear distinction between:
  - **Presentational Components**: Pure UI components (Card, SnipsImage)
  - **Container Components**: Components that manage state and data fetching (screens)
  - **Custom Hooks**: Business logic extraction (useHomeComponents, useInfiniteFeedPage)

### 2. State Management Strategy
- **Server State**: Managed by React Query
  - Automatic caching and background refetching
  - Optimistic updates support
  - Request deduplication
- **Local State**: Managed by React hooks (useState, useReducer)
- **No Global State Library**: Avoided Redux/MobX as React Query handles server state effectively

### 3. Type Safety
- **Strict TypeScript**: Enabled with `noImplicitAny`, `strictNullChecks`
- **No `any` Types**: All types are explicitly defined
- **Type-safe Navigation**: Navigation types defined in `NavigationTypes.ts`
- **API Types**: All API responses typed in `ApiTypes.ts`

### 4. Performance-First Approach
- **Memoization**: Strategic use of `React.memo`, `useMemo`, and `useCallback`
- **List Optimization**: FlatList with performance props (see Performance section)
- **Image Optimization**: Custom `SnipsImage` component with loading states and error handling
- **Code Splitting**: Component-level code organization for better bundle management

### 5. Error Handling
- **API Level**: Axios interceptors for network errors
- **Component Level**: Error boundaries and fallback UI
- **Query Level**: React Query error states with user-friendly messages

### 6. Responsive Design
- **Device Dimensions**: Dynamic calculation based on device screen size
- **Safe Area Handling**: Proper insets for notched devices
- **iPad Support**: Conditional rendering and layout adjustments for tablets

## Performance Optimizations

### FlatList Optimizations (Feed Screen)
The Feed screen implements several performance optimizations for smooth scrolling:

```typescript
// Key optimizations applied:
- getItemLayout: Pre-calculated item dimensions for faster rendering
- removeClippedSubviews: Removes off-screen views from native view hierarchy
- maxToRenderPerBatch: 2 items per batch (reduced from default 10)
- windowSize: 3 viewport heights (reduced from default 21)
- initialNumToRender: 2 items initially (reduced from default 10)
- updateCellsBatchingPeriod: 50ms batching period
- scrollEventThrottle: 16ms for smooth 60fps scrolling
```

### Component Memoization
- **FeedItem**: Memoized with custom comparison function (compares by `item.id`)
- **Card**: Memoized to prevent unnecessary re-renders
- **SnipsImage**: Memoized for image loading optimization
- **ExpandableDescription**: Memoized to prevent re-renders during text expansion

### Callback Optimization
- All event handlers wrapped in `useCallback` to maintain referential equality
- Render functions memoized to prevent child component re-renders
- Key extractors memoized for consistent list item keys

### Horizontal List Optimizations
- Optimized batch rendering for horizontal scrolling
- Proper key extraction for list items
- Scroll event throttling

### Image Loading
- Custom `SnipsImage` component with:
  - Loading indicators during image fetch
  - Error state handling with fallback UI
  - Proper image caching through React Native's Image component

## API Endpoints

### Base URL
The API base URL is configured via environment variables (`.env` file or system environment).

### Endpoints

1. **Home Page**
   - Endpoint: `/homePage.json`
   - Method: GET
   - Returns: Featured content, category sections, and "More to watch" section

2. **Feed Page**
   - Endpoint: `/FeedPage1.json?page={pageNumber}`
   - Method: GET
   - Query Parameters:
     - `page`: Page number (default: 1)
   - Returns: Paginated feed items with metadata

### API Response Structure
All API responses are typed in `src/services/types/ApiTypes.ts` for type safety.

## Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Functional components with hooks
- **Naming**: 
  - Components: PascalCase (e.g., `FeedItem`)
  - Files/Directories: kebab-case (e.g., `feed-item`)
  - Variables/Functions: camelCase (e.g., `handleLoadMore`)

### Styling Rules
- **No Inline Styles**: All styles must be in `styles.ts` files
- **Style Separation**: Each component has its own `styles.ts` file
- **Constants**: Shared styling constants in `services/constants/common.ts`

### Component Development
- **Component Structure**: Always follow the folder structure (`index.tsx`, `styles.ts`, `types.ts`)
- **Memoization**: Use `React.memo` for components that receive stable props
- **Hooks**: Extract complex logic into custom hooks
- **Props**: Always define TypeScript interfaces for component props

### State Management
- **Server State**: Use React Query hooks (`useQuery`, `useInfiniteQuery`)
- **Local State**: Use `useState` or `useReducer` for component-specific state
- **Derived State**: Use `useMemo` for computed values

### Performance Best Practices
- Always provide `keyExtractor` for lists
- Use `getItemLayout` when item heights are known
- Memoize callbacks passed to child components
- Avoid creating new objects/arrays in render methods

## Assumptions

1. **API Availability**: The application assumes the Snips API endpoints are available and accessible. Error handling is in place for network failures.

2. **Device Support**: 
   - Primary target: iOS and Android smartphones
   - iPad support: Basic layout adjustments, but not fully optimized for tablet experience
   - Minimum iOS version: 13.0+
   - Minimum Android API level: 21+

3. **Network Requirements**: 
   - The app requires an active internet connection to fetch content
   - Images are loaded from remote URLs (no offline image caching beyond React Native's default)

4. **Data Structure**: 
   - API responses follow the expected structure defined in `ApiTypes.ts`
   - Feed pagination uses page-based pagination (not cursor-based)

5. **User Permissions**: 
   - No special device permissions required for core functionality
   - Safe area handling assumes standard device layouts

6. **Performance Targets**:
   - Target 60fps scrolling performance
   - Optimized for devices with at least 2GB RAM
   - Network timeout set to 30 seconds

7. **Styling**: 
   - Design system assumes dark theme (`#0E0E0E` background)
   - Fonts (Inter, Poppins) are bundled with the app
   - Responsive design based on design width of 393px

8. **Navigation**: 
   - Bottom tab navigation is the primary navigation pattern
   - "Rewards" and "Profile" screens are placeholder screens (not implemented)

## Scripts

- `yarn start`: Start Metro bundler
- `yarn ios`: Run on iOS simulator/device
- `yarn android`: Run on Android emulator/device
- `yarn lint`: Run ESLint
- `yarn test`: Run Jest tests

## License

[Add your license information here]
