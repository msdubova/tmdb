import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

import "./Genres.css";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]); // Добавляем жанр в выбранные
    setGenres(genres.filter((g) => g.id !== genre.id)); // Убираем жанр из доступных
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]); // Добавляем жанр обратно в доступные
    setPage(1);
  };

  const handleKeyDown = (e, genre) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Чтобы избежать нежелательных действий при нажатии Enter
      if (selectedGenres.includes(genre)) {
        handleRemove(genre); // Если жанр уже выбран, удаляем его
      } else {
        handleAdd(genre); // Если жанр не выбран, добавляем его
      }
    }
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // Убираем жанры при смене раздела
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="genres">
      {/* Выбранные жанры */}
      {selectedGenres.map((genre) => (
        <Chip
          style={{
            margin: 6,
            height: 32, // Фиксированная высота
            borderRadius: 0, // Убираем сглаженные углы
            fontWeight: "bold",
          }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="large"
          onDelete={() => handleRemove(genre)}
          onKeyDown={(e) => handleKeyDown(e, genre)} // Обработчик для клавиши Enter
          tabIndex={0} // Для того, чтобы элемент был доступен для фокуса
        />
      ))}
      {/* Доступные жанры */}
      {genres.map((genre) => (
        <Chip
          style={{
            margin: 6,
            height: 32, // Фиксированная высота
            borderRadius: 0,
            fontWeight: "bold",
          }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
          onKeyDown={(e) => handleKeyDown(e, genre)} // Обработчик для клавиши Enter
          tabIndex={0} // Для того, чтобы элемент был доступен для фокуса
        />
      ))}
    </div>
  );
};

export default Genres;
