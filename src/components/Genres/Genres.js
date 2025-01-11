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
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const handleKeyDown = (e, genre) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedGenres.includes(genre)) {
        handleRemove(genre);
      } else {
        handleAdd(genre);
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
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="genres">
      {selectedGenres.map((genre) => (
        <Chip
          style={{
            margin: 6,
            height: 32,
            borderRadius: 0,
            fontWeight: "bold",
          }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="large"
          onDelete={() => handleRemove(genre)}
          onKeyDown={(e) => handleKeyDown(e, genre)}
          tabIndex={0}
        />
      ))}

      {genres.map((genre) => (
        <Chip
          style={{
            margin: 6,
            height: 32,
            borderRadius: 0,
            fontWeight: "bold",
          }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
          onKeyDown={(e) => handleKeyDown(e, genre)}
          tabIndex={0}
        />
      ))}
    </div>
  );
};

export default Genres;
