import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Favorites.css";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1); // Изначально установим 1 для пагинации

  // Функция для получения данных о фильмах из API
  const fetchFavoriteMovies = async () => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favoriteIds.length === 0) {
      setIsLoading(false); // Если избранных нет, завершаем загрузку
      return;
    }

    try {
      const requests = favoriteIds
        .slice((page - 1) * 20, page * 20)
        .map((id) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
          )
        );

      const responses = await Promise.all(requests); // Выполняем все запросы
      const movies = responses.map((response) => response.data); // Сохраняем данные фильмов
      setFavoriteMovies(movies);
      setNumOfPages(Math.ceil(favoriteIds.length / 20)); // Делим общее количество на 20 (максимум на страницу)
    } catch (error) {
      console.error("Ошибка при загрузке избранных фильмов:", error);
    } finally {
      setIsLoading(false); // Завершаем загрузку
    }
  };

  // Вызываем функцию загрузки фильмов при монтировании и при изменении страницы
  useEffect(() => {
    fetchFavoriteMovies();
  }, [page]);

  return (
    <div className="favorites-page">
      <span className="pageTitle">Избранное</span>
      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : favoriteMovies.length > 0 ? (
        <div className="trending">
          {favoriteMovies.map((movie) => (
            <SingleContent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.release_date || movie.first_air_date}
              media_type="movie" // Здесь всегда "movie", так как запрос идет только для фильмов
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <h2 className="no-favorites">Нет избранных фильмов</h2>
      )}

      {/* Пагинация */}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Favorites;
