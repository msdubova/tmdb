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
  const [isLoading, setIsLoading] = useState(true);
  const [contentDetails, setContentDetails] = useState(null);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const contentType = media_type === "tv" ? "tv" : "movie";
        const response = await fetch(
          `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContentDetails(data);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isInFavorites = favorites.some(
          (item) =>
            item.id === id &&
            item.media_type === media_type &&
            item.release_date === date
        );
        setIsFavorite(isInFavorites);
      } catch (error) {
        console.error("Error fetching content details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContentDetails();
  }, [id, media_type, date]);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();

    if (isLoading || !contentDetails) {
      console.log("Still loading or content details not available");
      return;
    }

    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const contentInfo = {
        id,
        media_type,
        title,
        release_date: date,
        posterPath: poster,
        external_ids: contentDetails.external_ids || {},
      };

      if (isFavorite) {
        const updatedFavorites = favorites.filter(
          (item) =>
            !(
              item.id === id &&
              item.media_type === media_type &&
              item.release_date === date
            )
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        const contentExists = favorites.some(
          (item) =>
            item.id === id &&
            item.media_type === media_type &&
            item.release_date === date
        );

        if (!contentExists) {
          const updatedFavorites = [...favorites, contentInfo];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleFavoriteToggle(e);
    }
  };

  return (
    <ContentModal media_type={media_type} id={id}>
      <StyledBadge badgeContent={vote_average.toFixed(1)} vote={vote_average} />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
        <button
          onClick={handleFavoriteToggle}
          onKeyDown={handleKeyDown}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          disabled={isLoading}
        >
          {isFavorite ? (
            <FavoriteIcon
              sx={{ color: "red" }}
              aria-hidden="true"
              focusable="false"
            />
          ) : (
            <FavoriteBorderIcon aria-hidden="true" focusable="false" />
          )}
        </button>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
