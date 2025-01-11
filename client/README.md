# Movie Project

You will need to get an API key from TMDB: https://developers.themoviedb.org/3/getting-started/introduction and store it in a .env file as REACT_APP_API_KEY

---

## Details

This website is a frontend for <https://www.themoviedb.org/>'s API. It allows a user to search for movies and shows and view information about them. It also displays a list of trending, popular, and upcoming movies.

## Key Features

- Displays popular, trending, top rated movies and shows.
- Search movies and shows using the searchbox.
- Show movie details such as description, cast, trailers, release date and rating
- Filter movies and shows by genres

## Key Parts

It is comprised of the following parts

### Pages

- Trending
- Movies
- TV Shows
- Search

### Components

React Components Include:

- Carousel -> Displays the cast members of the movie / show for the modal
- ContentModal -> Opens the modal when a user clicks on a movie / show
- Genres -> Allows the user to filter movies / shows by genre and updates the UI accordingly
- Header -> Displays the name of the project
- MainNav -> Displays the main navigation bar that allows the user to go to different parts of our applciation
- CustomPagination -> Displays the pagination icons and allows the user to go to the next page and see more movies / shows
- SingleContent -> Displays the poster, rating, title and release date for our individual movies and shows

## Installation Instructions

To run this project locally, you will need to do the following:

1. Clone the repository `https://github.com/msdubova`
2. Install the dependencies via: `npm install`
3. create a .env file in the root directory which takes one entry
   - REACT_APP_API_KEY = `YOUR_API_KEY_HERE`
4. Run the project via: `npm start`

## Roadmap

- [x] Show trending movies and TV shows
- [x] Implement Search Movies functionality
- [x] Implement Search Shows functionality
- [x] Display movie details along with cast
- [x] Filter movies by genres
- [x] Filter shows by genres
- [x] Display the rating and year for TV shows
- [x] Display the rating and year for Movies
- [x] Display TV show details
- [x] Display movie details
- [x] Pagination to load content
- [x] General page responsiveness
- [x] Adding TypeScript
- [ ] Adding tests
- [ ] Dark Mode / Light Mode theme switcher (very low priority)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
