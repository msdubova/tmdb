# Movie Project

A modern frontend application for exploring movies and TV shows using the TMDB (The Movie Database) API. This interactive platform allows users to discover, search, and explore detailed information about their favorite content.

## Features

- Browse popular, trending, and top-rated movies and TV shows
- Comprehensive search functionality for movies and TV shows
- Detailed content information including:
  - Plot descriptions
  - Cast information
  - Trailers
  - Release dates
  - Ratings
- Genre-based filtering system
- Responsive design for all devices
- Local storage-based favorites system

## Pages

- **Trending**: Discover what's hot right now
- **Movies**: Explore the world of cinema
- **TV Shows**: Find your next binge-worthy series
- **Search**: Find specific content
- **Favorites**: Keep track of your must-watch list

## Components

- **Carousel**: Dynamic display of cast members
- **ContentModal**: Detailed view of selected content
- **Genres**: Interactive genre filtering system
- **Header**: Application branding
- **MainNav**: Primary navigation interface
- **CustomPagination**: Page navigation system
- **SingleContent**: Content card displaying key information

## Installation

1. Clone the repository:

```bash
git clone https://github.com/msdubova/tmdb
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add your TMDB API key: 905f3f9624e460d90f12e0e8b7e07f56

```
REACT_APP_API_KEY=YOUR_API_KEY_HERE
```

Note: Register at [TMDB](https://www.themoviedb.org/) to obtain your API key.

4. Start the development server:

```bash
npm start
```

## Project Roadmap

- [x] Implement trending content display
- [x] Add movie search functionality
- [x] Add TV show search functionality
- [x] Integrate detailed content information
- [x] Implement genre filtering
- [x] Add pagination system
- [x] Optimize responsive design
- [x] Implement favorites system with local storage

## Available Scripts

- `npm start`: Launch development server at http://localhost:3000
- `npm run build`: Create production build

## Technical Stack

- React.js
- Material-UI
- TMDB API
- Local Storage
- Create React App

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the API
- [Material-UI](https://mui.com/) for the component library
- [Create React App](https://create-react-app.dev/) for the project bootstrap
