import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledBadge = withStyles((theme) => ({
  badge: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: "20px",
    height: "25px",
    minWidth: "25px",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: (props) => (props.vote > 6 ? "#99b27f" : "#ca6144"),
  },
}))(Badge);

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    // Check if there is already a movie with the same id and name in favorites
    setIsFavorite(
      favoriteMovies.some((movie) => movie.id === id && movie.name === title)
    );
  }, [id, title]);

  // Handler for clicking to toggle favorite status
  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent opening the modal window
    const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    const movieData = { id, name: title };

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favoriteMovies.filter(
        (movie) => movie.id !== id || movie.name !== title
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favoriteMovies.push(movieData);
      localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
    }
    setIsFavorite(!isFavorite);
  };

  // Handler for pressing the Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation(); // Prevent event bubbling when pressing Enter
      handleFavoriteToggle(e); // Toggle favorite status on Enter key press
    }
  };

  return (
    <ContentModal media_type={media_type} id={id} tabIndex={0}>
      <StyledBadge badgeContent={vote_average.toFixed(1)} vote={vote_average} />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span>{id}</span>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
        {/* Favorite button */}
        {isFavorite ? (
          <FavoriteIcon
            onClick={handleFavoriteToggle}
            onKeyDown={handleKeyDown} // Add handler for Enter key
            style={{ cursor: "pointer", color: "red" }}
            tabIndex={0} // Enable focus
          />
        ) : (
          <FavoriteBorderIcon
            onClick={handleFavoriteToggle}
            onKeyDown={handleKeyDown} // Add handler for Enter key
            style={{ cursor: "pointer" }}
            tabIndex={0} // Enable focus
          />
        )}
      </span>
    </ContentModal>
  );
};

export default SingleContent;
