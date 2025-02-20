# TV Series Episodes Manager

A React application for managing TV series episodes. This project allows users to search for episodes, view detailed information, create new episodes, and delete existing ones.

## Technologies Used

- React
- TypeScript
- Vite
- GraphQL (Apollo Client)
- GSAP for animations
- Loadash

## Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_GRAPHQL_API_URL=
VITE_GRAPHQL_API_KEY=
VITE_WEBSOCKET_URL=
VITE_OMDB_API_KEY=
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/teusto/streaming-test.git
   cd streaming-test
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173/` (or another port if 5173 is in use).

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Features

- Search episodes as you type with debounced queries
- View detailed episode information
- Create new episodes
- Delete existing episodes
- Real-time updates with GraphQL subscriptions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request