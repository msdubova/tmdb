import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Favorites.css";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
      console.log("Favorite movie IDs from localStorage:", favoriteIds);

      if (favoriteIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const requests = favoriteIds
          .slice((page - 1) * 20, page * 20)
          .map((favorite) =>
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${favorite.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
              )
              .catch((error) => {
                console.error(
                  `Error fetching movie with ID ${favorite.id}:`,
                  error
                );
                return null;
              })
          );

        const responses = await Promise.all(requests);
        console.log("API Responses:", responses);

        const movies = [];
        const seen = new Set();

        responses
          .filter((response) => response !== null)
          .forEach((response) => {
            const movie = response.data;
            const uniqueKey = `${movie.id}-${movie.title || movie.name}`;
            if (!seen.has(uniqueKey)) {
              seen.add(uniqueKey);
              movies.push(movie);
            }
          });

        console.log("Fetched movies:", movies);

        setFavoriteMovies(movies);
        setNumOfPages(Math.ceil(favoriteIds.length / 20));
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [page]); // теперь page - единственная зависимость

  return (
    <div className="favorites-page">
      <span className="pageTitle">Favorites</span>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : favoriteMovies.length > 0 ? (
        <div className="trending">
          {favoriteMovies.map((movie) => (
            <SingleContent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.release_date || movie.first_air_date}
              media_type="movie"
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <h2 className="no-favorites">No favorite movies found</h2>
      )}

      {/* Pagination */}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Favorites;
