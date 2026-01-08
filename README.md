# Snips Mobile App

A React Native mobile application built with TypeScript, featuring Home and Feed pages with content from Snips API. The app provides a modern, performant mobile experience with optimized list rendering, infinite scrolling, video playback controls, and responsive design.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Technical Stack](#technical-stack)
- [Architecture Decisions](#architecture-decisions)
- [Performance Optimizations](#performance-optimizations)
- [Video Playback Features](#video-playback-features)
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
API_BASE_URL=https://your-api-url.com
```

**Important**: The `API_BASE_URL` environment variable is **required**. The app will throw an error if it's not configured. See `example.env` for reference.

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
│   │   ├── fonts/          # Custom font files (Inter, Poppins)
│   │   └── images/         # Image assets (@2x variants included)
│   ├── components/         # Reusable UI components
│   │   ├── Card/          # Card component for displaying titles
│   │   ├── HorizontalList/ # Horizontal scrolling list component
│   │   ├── SnipsImage/    # Custom image component with loading states
│   │   └── ExploreMoreCard/ # Special card for "explore more" section
│   ├── constants/         # App-wide constants
│   │   ├── common.ts      # Colors, spacing, dimensions, API endpoints
│   │   └── typography.ts  # Font families, sizes, typography styles
│   ├── navigation/        # Navigation configuration
│   │   ├── NavigationContainer.tsx # Main navigation with prefetching
│   │   ├── TabNavigator.tsx # Bottom tab navigation
│   │   └── NavigationTypes.ts # Type-safe navigation types
│   ├── screens/           # Screen components
│   │   ├── Home/          # Home screen with featured content
│   │   │   ├── components/ # Screen-specific components
│   │   │   │   ├── FeaturedCard/ # Featured content card with gradient
│   │   │   │   ├── CategorySection/ # Category list section
│   │   │   │   └── HomeListItem/ # List item renderer
│   │   │   └── hooks/     # Custom hooks for Home screen
│   │   │       ├── useHomeComponents.ts # Component data extraction
│   │   │       ├── useHomeScrollReset.ts # Scroll reset logic
│   │   │       └── useHorizontalScroll.ts # Horizontal scroll management
│   │   └── Feed/          # Feed screen with infinite scroll and video playback
│   │       ├── components/ # Screen-specific components
│   │       │   ├── FeedItem/ # Individual feed item with video
│   │       │   │   └── hooks/ # FeedItem business logic
│   │       │   │       └── useFeedItem.ts # Video playback state management
│   │       │   └── ExpandableDescription/ # Expandable text component
│   │       └── hooks/     # Feed screen hooks
│   │           ├── useFeedVideoControl.ts # Video playback orchestration
│   │           ├── useAppStateVideoControl.ts # App state video management
│   │           ├── useVideoFocusEffects.ts # Navigation focus effects
│   │           └── useHomePagePreview.ts # Home page video preview
│   ├── services/          # Business logic and API services
│   │   ├── apis/         # API client and endpoints
│   │   │   ├── AxiosClient.ts # Axios configuration with interceptors
│   │   │   └── Apis.ts # API endpoint functions
│   │   ├── config/       # Configuration
│   │   │   └── env.ts # Environment variable management
│   │   ├── queries/      # React Query hooks and configuration
│   │   │   ├── useHomePage.ts # Home page data fetching
│   │   │   ├── useFeedPage.ts # Feed page data fetching
│   │   │   ├── useInfiniteFeedPage.ts # Infinite feed pagination
│   │   │   ├── queryClient.ts # React Query configuration
│   │   │   └── queryOptions.ts # Centralized query options
│   │   └── types/        # TypeScript type definitions
│   │       └── ApiTypes.ts # API response types
│   ├── types/            # Global type definitions
│   │   └── env.d.ts # Environment variable types
│   └── utils/            # Utility functions
│       ├── formatUtils.ts # Formatting utilities
│       └── platform.ts # Platform detection utilities
├── App.tsx               # Root app component
├── index.js              # Entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── example.env           # Example environment configuration
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
  - Configured with optimized cache settings (staleTime, gcTime)
  - Centralized query options for consistency

### Navigation
- **React Navigation**: v6.1.9
  - Bottom tab navigator for main app navigation
  - Type-safe navigation with TypeScript
  - Safe area handling for notched devices
  - Prefetching on navigation ready

### Video Playback
- **React Native Video**: v6.18.0
  - Full-screen video playback in Feed screen
  - Automatic play/pause based on viewability
  - Mute/unmute controls
  - Background/foreground state management
  - Memory-efficient cleanup and ref management

### API & Networking
- **Axios**: v1.6.5
  - HTTP client with interceptors for error handling
  - Centralized API configuration
  - Network timeout: 30 seconds
  - Custom error handling with specific error messages

### Styling
- **StyleSheet API**: Native React Native styling
- **React Native Linear Gradient**: For gradient overlays
- **All colors centralized**: Hex format in `COLORS` constant
- **All styles separated**: Dedicated `styles.ts` files (no inline styles)
- **Typography system**: Centralized font families, sizes, and styles with platform-specific handling

### Additional Libraries
- **React Native Safe Area Context**: For handling device safe areas
- **React Native Gesture Handler**: For smooth gesture interactions
- **React Native Screens**: For native screen management
- **React Native Config**: For environment variable management
- **React Native Masked View**: For masked gradient effects

## Architecture Decisions

### 1. Component Organization
- **Folder-based Structure**: Each component/screen is organized in its own folder with:
  - `index.tsx`: Component logic
  - `styles.ts`: All styling (no inline styles)
  - `types.ts`: TypeScript interfaces (when needed)
- **Separation of Concerns**: Clear distinction between:
  - **Presentational Components**: Pure UI components (Card, SnipsImage)
  - **Container Components**: Components that manage state and data fetching (screens)
  - **Custom Hooks**: Business logic extraction (useHomeComponents, useInfiniteFeedPage, useFeedItem)

### 2. State Management Strategy
- **Server State**: Managed by React Query
  - Automatic caching and background refetching
  - Optimistic updates support
  - Request deduplication
  - Infinite query support for pagination
- **Local State**: Managed by React hooks (useState, useReducer)
- **Video State**: Managed through custom hooks with refs for imperative control
- **No Global State Library**: Avoided Redux/MobX as React Query handles server state effectively

### 3. Type Safety
- **Strict TypeScript**: Enabled with `noImplicitAny`, `strictNullChecks`
- **No `any` Types**: All types are explicitly defined
- **Type-safe Navigation**: Navigation types defined in `NavigationTypes.ts`
- **API Types**: All API responses typed in `ApiTypes.ts`
- **Path Aliases**: Configured with `@/*` for cleaner imports

### 4. Performance-First Approach
- **Memoization**: Strategic use of `React.memo`, `useMemo`, and `useCallback`
- **List Optimization**: FlatList with performance props (see Performance section)
- **Image Optimization**: Custom `SnipsImage` component with loading states and error handling
- **Video Optimization**: Proper cleanup, ref management, and memory leak prevention
- **Code Splitting**: Component-level code organization for better bundle management
- **Ref Management**: Centralized ref handling for scroll and video management

### 5. Error Handling
- **API Level**: Axios interceptors for network errors with specific error messages
- **Component Level**: Error boundaries and fallback UI
- **Query Level**: React Query error states with user-friendly messages
- **Environment Configuration**: Required API URL configuration (no hardcoded fallbacks)

### 6. Responsive Design
- **Device Dimensions**: Dynamic calculation based on device screen size
- **Safe Area Handling**: Proper insets for notched devices
- **iPad Support**: Conditional rendering and layout adjustments for tablets
- **Scaling Functions**: `scaleWidth` and `scaleHeight` for responsive sizing
- **Platform-specific Styling**: Platform.select for iOS/Android differences

### 7. Color & Typography Management
- **Centralized Colors**: All colors defined in `constants/common.ts`
- **Hex Format**: All colors use hex format (including alpha channel)
- **No Hardcoded Colors**: All color values reference constants
- **Consistent Theming**: Dark theme with centralized color palette
- **Typography System**: Centralized font families, sizes, and styles in `constants/typography.ts`
- **Platform-specific Fonts**: Android-specific font file names with conditional fontWeight

### 8. Memory Management
- **Video Cleanup**: Proper cleanup of video refs, timeouts, and components on unmount
- **Ref Cleanup**: Automatic cleanup of refs for removed items
- **Timeout Management**: All timeouts cleared on component unmount
- **Memory Leak Prevention**: Comprehensive cleanup in useEffect hooks

## Performance Optimizations

### FlatList Optimizations (Feed Screen)
The Feed screen implements several performance optimizations for smooth scrolling:

```typescript
// Key optimizations applied:
- getItemLayout: Pre-calculated item dimensions for faster rendering
- removeClippedSubviews: Removes off-screen views from native view hierarchy
- maxToRenderPerBatch: 3 items per batch
- windowSize: 3 viewport heights (optimized for memory)
- initialNumToRender: 3 items initially
- pagingEnabled: Enabled for snap-to-item scrolling (disabled on iPad)
- scrollEventThrottle: 16ms for smooth 60fps scroll events
```

### HorizontalList Optimizations
Horizontal lists (featured content, categories) are optimized with:

```typescript
// Key optimizations:
- getItemLayout: Pre-calculated item widths for horizontal scrolling
- removeClippedSubviews: Removes off-screen items
- maxToRenderPerBatch: 9 items per batch
- windowSize: 9 viewport widths
- initialNumToRender: 3 items initially
- scrollEventThrottle: 16ms for smooth 60fps scrolling
```

### Component Memoization
- **FeedItem**: Memoized with custom comparison function (compares by `item.id` and `scrollHeight`)
- **Card**: Memoized with comparison function (compares by `title.id` and `componentType`)
- **SnipsImage**: Memoized with prop comparison (compares by `source` URI)
- **ExpandableDescription**: Memoized to prevent re-renders during text expansion
- **SideIcons**: Memoized to prevent unnecessary re-renders

### Animation Optimizations
- **ExpandableDescription**: Fast 150ms animation duration for responsive text expansion
- Uses `LayoutAnimation` for smooth height transitions
- Optimized animation timing for better user experience

### Callback Optimization
- All event handlers wrapped in `useCallback` to maintain referential equality
- Render functions memoized to prevent child component re-renders
- Key extractors memoized for consistent list item keys
- Ref callbacks optimized to prevent unnecessary updates

### Custom Hooks for Performance
- **useHomeComponents**: Single-pass component extraction for efficiency
- **useHorizontalScroll**: Centralized scroll management with ref forwarding
- **useHomeScrollReset**: Optimized scroll reset with deferred execution
- **useFeedItem**: Extracted video playback logic for better performance

### Image Loading
- Custom `SnipsImage` component with:
  - Loading indicators during image fetch
  - Error state handling with fallback UI
  - Proper image caching through React Native's Image component
  - Absolute fill positioning for proper container filling
  - ResizeMode prop support for image scaling behavior

### Video Playback Optimizations
- **Viewability-based Playback**: Videos only play when visible
- **Automatic Pause on Scroll**: All videos pause during scrolling
- **Memory-efficient Cleanup**: Proper cleanup of video refs and timeouts
- **Ref Management**: Automatic cleanup of refs for removed items
- **State Management**: Efficient state updates with minimal re-renders

## Video Playback Features

### Automatic Playback Control
- **Viewability Detection**: Videos automatically play when they become visible (50% threshold)
- **Scroll-based Pausing**: All videos pause when user starts scrolling
- **Single Video Playback**: Only one video plays at a time
- **Play Button**: Shows when video is paused and has started

### App State Management
- **Background Pausing**: Videos automatically pause when app goes to background
- **Foreground Resume**: Videos resume when app returns to foreground (if screen is focused)
- **State Preservation**: Remembers which video was playing before backgrounding

### Navigation Focus Effects
- **Screen Focus**: Videos unmute when Feed screen is focused
- **Screen Blur**: Videos mute when Feed screen loses focus
- **Auto-play on Focus**: First visible video plays when screen is focused

### Home Page Preview
- **Auto-preview**: First video from home page auto-plays (muted) on app startup
- **Preview Duration**: Limited preview duration (150ms)
- **One-time Only**: Preview only plays once per app session

### Memory Management
- **Proper Cleanup**: All video refs, timeouts, and components cleaned up on unmount
- **Ref Cleanup**: Refs for removed items are automatically cleaned up
- **Video Reset**: Videos seek to start position on unmount

## API Endpoints

### Base URL
The API base URL is configured via environment variables (`.env` file or system environment). **Required** - the app will throw an error if not configured.

### Endpoints

1. **Home Page**
   - Endpoint: `/homePage.json`
   - Method: GET
   - Returns: Featured content, category sections, and "More to watch" section
   - Hook: `useHomePage()`
   - Cache: 5 minutes stale time

2. **Feed Page**
   - Endpoint: `/FeedPage1.json?page={pageNumber}`
   - Method: GET
   - Query Parameters:
     - `page`: Page number (default: 1, always included in URL)
   - Returns: Paginated feed items with metadata
   - Hooks: 
     - `useFeedPage()`: Single page query
     - `useInfiniteFeedPage()`: Infinite scroll with pagination (stops when no more pages available)
   - Cache: 2 minutes stale time, 10 minutes garbage collection time

### API Response Structure
All API responses are typed in `src/services/types/ApiTypes.ts` for type safety.

### Error Handling
- Network errors: User-friendly messages
- HTTP status codes: Specific error messages
- Timeout handling: 30-second timeout with appropriate error messages
- Required configuration: App throws error if `API_BASE_URL` is not configured

## Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Functional components with hooks
- **Naming**: 
  - Components: PascalCase (e.g., `FeedItem`)
  - Files/Directories: kebab-case (e.g., `feed-item`)
  - Variables/Functions: camelCase (e.g., `handleLoadMore`)
  - Constants: UPPER_SNAKE_CASE (e.g., `COLORS`, `SPACING`)

### Styling Rules
- **No Inline Styles**: All styles must be in `styles.ts` files
- **Style Separation**: Each component has its own `styles.ts` file
- **Constants**: Shared styling constants in `constants/common.ts` and `constants/typography.ts`
- **Color Management**: All colors must use `COLORS` constant (hex format)
- **Typography**: All text styles must use `TYPOGRAPHY` constants
- **No Hardcoded Values**: Colors, spacing, dimensions, and fonts should reference constants
- **Platform-specific**: Use `Platform.select` for iOS/Android differences

### Component Development
- **Component Structure**: Always follow the folder structure (`index.tsx`, `styles.ts`, `types.ts`)
- **Memoization**: Use `React.memo` with custom comparison functions when appropriate
- **Hooks**: Extract complex logic into custom hooks
- **Props**: Always define TypeScript interfaces for component props
- **Refs**: Use `forwardRef` and callback refs for ref forwarding
- **Business Logic**: Extract business logic to custom hooks (e.g., `useFeedItem`)

### State Management
- **Server State**: Use React Query hooks (`useQuery`, `useInfiniteQuery`)
- **Local State**: Use `useState` or `useReducer` for component-specific state
- **Derived State**: Use `useMemo` for computed values
- **Refs**: Use `useRef` for DOM references and mutable values
- **Video State**: Use custom hooks with imperative refs for video control

### Performance Best Practices
- Always provide `keyExtractor` for lists
- Use `getItemLayout` when item dimensions are known
- Memoize callbacks passed to child components
- Avoid creating new objects/arrays in render methods
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Implement proper memoization comparison functions
- Clean up all timeouts and refs in useEffect cleanup functions

### Custom Hooks
- Extract reusable logic into custom hooks
- Keep hooks focused on a single responsibility
- Use TypeScript interfaces for hook return types
- Document hook behavior with JSDoc comments
- Ensure proper cleanup in useEffect hooks

### Console Logging
- **Production**: No console.log statements in production code
- **Development**: Use `__DEV__` guard for development-only logging
- **Error Logging**: Use proper error logging service in production

## Assumptions

1. **API Availability**: The application assumes the Snips API endpoints are available and accessible. Error handling is in place for network failures. **API_BASE_URL is required** - no fallback defaults.

2. **Device Support**: 
   - Primary target: iOS and Android smartphones
   - iPad support: Basic layout adjustments, but not fully optimized for tablet experience
   - Minimum iOS version: 13.0+
   - Minimum Android API level: 21+

3. **Network Requirements**: 
   - The app requires an active internet connection to fetch content
   - Images are loaded from remote URLs (no offline image caching beyond React Native's default)
   - Network timeout: 30 seconds

4. **Data Structure**: 
   - API responses follow the expected structure defined in `ApiTypes.ts`
   - Feed pagination uses page-based pagination (not cursor-based)
   - Infinite scroll stops when `nextPage` exceeds `totalPages` (no looping)

5. **User Permissions**: 
   - No special device permissions required for core functionality
   - Safe area handling assumes standard device layouts

6. **Performance Targets**:
   - Target 60fps scrolling performance
   - Optimized for devices with at least 2GB RAM
   - Network timeout set to 30 seconds
   - Memory-efficient video playback with proper cleanup

7. **Styling**: 
   - Design system assumes dark theme (`#0E0E0E` background)
   - Fonts (Inter, Poppins) are bundled with the app
   - Responsive design based on design width of 393px
   - All colors use hex format with alpha channel support
   - Platform-specific font handling (Android uses specific font files)

8. **Navigation**: 
   - Bottom tab navigation is the primary navigation pattern
   - "Rewards" and "Profile" screens are placeholder screens (not implemented)
   - Scroll positions reset when returning to Home screen
   - Feed page prefetches on navigation ready

9. **Video Playback**:
   - Videos play automatically when visible
   - Only one video plays at a time
   - Videos pause on scroll, background, and screen blur
   - Proper memory cleanup on unmount

10. **Android Configuration**:
    - Network security config enforces HTTPS by default
    - Cleartext traffic allowed only for localhost in development
    - ProGuard rules configured for React Native and networking libraries
    - Custom fonts require specific font file names (no fontWeight support)

## Scripts

- `yarn start`: Start Metro bundler (kills existing process on port 8081)
- `yarn ios`: Run on iOS simulator/device
- `yarn android`: Run on Android emulator/device
- `yarn lint`: Run ESLint on `src`, `App.tsx`, and `index.js`
- `yarn test`: Run Jest tests

## License

[Add your license information here]
