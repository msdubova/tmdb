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
    fontSize: "20px", // Увеличиваем текст бейджа
    height: "25px", // Устанавливаем высоту бейджа
    minWidth: "25px", // Устанавливаем минимальную ширину бейджа
    padding: "15px", // Увеличиваем внутренние отступы
    borderRadius: "8px", // Скругляем края бейджа
    backgroundColor: (props) => (props.vote > 6 ? "#99b27f" : "#ca6144"), // Задаём фон в зависимости от рейтинга
    color: "#fff", // Цвет текста
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
  // Состояние для избранного
  const [isFavorite, setIsFavorite] = useState(false);

  // Загрузка состояния избранного из localStorage
  useEffect(() => {
    const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favoriteMovies.includes(id));
  }, [id]);

  // Обработчик клика для изменения статуса избранного
  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Предотвращаем открытие модального окна
    const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Удаляем из избранного
      const updatedFavorites = favoriteMovies.filter(
        (movieId) => movieId !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Добавляем в избранное
      favoriteMovies.push(id);
      localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
    }
    setIsFavorite(!isFavorite);
  };

  // Обработчик для нажатия клавиши Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation(); // Предотвращаем всплытие события при нажатии Enter
      handleFavoriteToggle(e); // Включаем или отключаем избранное при нажатии Enter
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
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
        {/* Кнопка избранного */}
        {isFavorite ? (
          <FavoriteIcon
            onClick={handleFavoriteToggle}
            onKeyDown={handleKeyDown} // Добавляем обработчик для клавиши Enter
            style={{ cursor: "pointer", color: "red" }}
            tabIndex={0} // Добавляем возможность фокуса
          />
        ) : (
          <FavoriteBorderIcon
            onClick={handleFavoriteToggle}
            onKeyDown={handleKeyDown} // Добавляем обработчик для клавиши Enter
            style={{ cursor: "pointer" }}
            tabIndex={0} // Добавляем возможность фокуса
          />
        )}
      </span>
    </ContentModal>
  );
};

export default SingleContent;
