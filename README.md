# FER Frontend

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- React Router
- shadcn/ui
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or Bun package manager

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/shimmer-auth-ui.git
cd shimmer-auth-ui
```

2. Install dependencies
```sh
npm install
# or if using Bun
bun install
```

### Development

Start the development server:
```sh
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application for production:
```sh
npm run build
# or
bun run build
```

Preview the production build:
```sh
npm run preview
# or
bun run preview
```

## Project Structure

```
src/
  ├── components/
  │   ├── auth/        # Auth Related components
  │   └── ui/          # UI components (shadcn/ui)
  ├── hooks/           # Custom hooks
  ├── lib/             # Utility functions
  ├── pages/           # Page components
  ├── App.tsx          # Main application component
  └── main.tsx         # Entry point
```

## Features Till Now

- User registration and login
- Two-factor authentication
- Email verification
- Password management (reset, change)
- User profile management
- Account deletion
