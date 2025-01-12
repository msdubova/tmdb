import React, { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Favorites.css";

const Favorites = () => {
  const [favoriteContent, setFavoriteContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  useEffect(() => {
    const fetchFavoriteContent = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      console.log("Favorites from localStorage:", favorites);

      if (favorites.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const requests = favorites
          .slice((page - 1) * 20, page * 20)
          .map(async (favorite) => {
            try {
              const contentType = favorite.media_type === "tv" ? "tv" : "movie";
              const response = await fetch(
                `https://api.themoviedb.org/3/${contentType}/${favorite.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              // Проверяем соответствие данных
              if (data.id === favorite.id) {
                return {
                  ...data,
                  media_type: favorite.media_type,
                  poster_path: favorite.posterPath || data.poster_path,
                };
              }
              return null;
            } catch (error) {
              console.error(`Error fetching content:`, error);
              return null;
            }
          });

        const content = await Promise.all(requests);
        const validContent = content.filter((item) => item !== null);

        setFavoriteContent(validContent);
        setNumOfPages(Math.ceil(favorites.length / 20));
      } catch (error) {
        console.error("Error fetching favorite content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteContent();
  }, [page]);

  return (
    <div className="favorites-page">
      <span className="pageTitle">Favorites</span>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : favoriteContent.length > 0 ? (
        <div className="trending">
          {favoriteContent.map((content) => (
            <SingleContent
              key={`${content.id}-${content.media_type}`}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              date={content.release_date || content.first_air_date}
              media_type={content.media_type}
              vote_average={content.vote_average}
            />
          ))}
        </div>
      ) : (
        <h2 className="no-favorites">No favorites found</h2>
      )}

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Favorites;
