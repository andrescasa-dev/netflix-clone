# 🎬 Netflix Clone

A complete Netflix clone built with **Next.js**, featuring passwordless authentication, video streaming, user management, and a modern responsive user experience.


### **Give it a try**
-  https://netflixcasa.vercel.app/

## ✨ Key Features

### 🔐 **Authentication & Users**
- **Magic Link Authentication**: Passwordless authentication using Magic SDK
- **JWT Tokens**: Secure session management with JSON Web Tokens
- **Hasura Integration**: Custom JWT claims for granular access control
- **Persistent Sessions**: Secure cookies for maintaining active sessions

### 🎥 **Video Management**
- **Multiple Video Sources**: Integration with Vimeo API and YouTube API
- **Video Streaming**: Video playback using React Player
- **Dynamic Categories**: Videos organized by categories (Horror, Comedy, Documentary)
- **Popular Content**: Trending videos from Vimeo
- **Video Details**: Complete video information (duration, rating, description)

### 👤 **Personalized User Experience**
- **Watch History**: Video watch history with GraphQL
- **Like System**: Like/dislike system for videos
- **Recently Watched**: Personalized section for recently watched videos
- **Auto-Expire**: Watched videos automatically hidden after 1 month
- **Progress Tracking**: Video playback progress tracking

### 🎨 **Interface & UX**
- **Responsive Design**: Adaptive interface for all devices
- **Netflix-like UI**: Faithful Netflix-style design
- **Hero Section**: Main banner with featured video
- **Card System**: Video cards with different sizes (small, mid, big)
- **Modal System**: Modals for login and video preview
- **Loading States**: Spinners and skeletons for better UX

## 🏗️ General Architecture

### **Frontend (Next.js)**
```
├── Pages & Routing
│   ├── SSG (Static Site Generation) for home
│   ├── SSR (Server Side Rendering) for video pages
│   └── API Routes for backend functionality
│
├── Component Architecture (Atomic Design)
│   ├── Atoms (Button, Input, Icon, etc.)
│   ├── Molecules (Hero, MoviesSection, etc.)
│   ├── Organisms (Header, LoginForm, etc.)
│   └── Templates & Pages
│
└── State Management
    ├── Context API for global state
    └── Custom hooks for reusable logic
```

### **Backend Services**
```
├── Authentication Layer
│   ├── Magic SDK (Passwordless auth)
│   └── JWT with Hasura claims
│
├── Database (GraphQL + Hasura)
│   ├── Users table
│   ├── User_videos table (watch history, likes)
│   └── Real-time subscriptions
│
└── External APIs
    ├── Vimeo API (Video streaming)
    ├── YouTube API (Metadata & thumbnails)
    └── Plaiceholder (Image optimization)
```


## 🛠️ Technologies Used

### **Core Framework**
- **Next.js 13.5+**: React framework with SSG/SSR
- **React 18**: User interface library
- **CSS Modules**: Encapsulated and modular styles

### **Authentication & Security**
- **Magic SDK**: Passwordless authentication
- **JSON Web Tokens (JWT)**: Secure session management
- **Cookies**: Secure token storage

### **Database & API**
- **Hasura**: Automatic GraphQL backend
- **GraphQL**: Query language for APIs
- **PostgreSQL**: Relational database (via Hasura)

### **Video & Media**
- **React Player**: Universal video player
- **Vimeo API**: Video streaming
- **YouTube API v3**: Metadata and thumbnails
- **Plaiceholder**: Image optimization and colors

### **Development Tools**
- **ESLint**: Linting and code quality
- **Standard JS**: Consistent code style

## ⚠️ Problems Encountered and Solutions

### **1. 🖼️ Getting Video Thumbnails**
**Problem**: Vimeo API didn't always provide consistent quality thumbnails for all videos.

**Solution Implemented**:
- Used **YouTube API v3** specifically to get high-quality thumbnails
- Implemented hybrid system: Vimeo for streaming, YouTube for metadata
- Fallback to static data in `data/videos.js` for development

### **2. 🔄 State Synchronization Between APIs**
**Problem**: Maintaining consistency between user data (GraphQL) and video metadata (external APIs).

**Solution**:
- Clear separation of responsibilities: GraphQL for user data, external APIs for content
- Universal ID system for videos
- Smart caching with ISR (Incremental Static Regeneration) revalidation

### **4. 🔐 Complex Authentication Management**
**Problem**: Integrating Magic Link with Hasura and maintaining global state.

**Solution**:
- Custom JWT claims for Hasura
- Custom hook `useLoadGlobalStoreAuth` for synchronization
- Next.js middleware for route protection

## 📄 License

This project is an educational exercise and is available under the MIT license.


<br/>

**Developed with ❤️ using Next.js and modern web development best practices.**

