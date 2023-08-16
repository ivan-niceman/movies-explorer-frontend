import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ONE_HOUR } from "../../utils/constants";

export default function MoviesCard({ trailerLink, link, title, duration, onLikeClick, savedMovies, card, handleDeleteMovie, handleRemoveMovie }) {
  const [isCardLiked, setIsCardLiked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isSavedMovie = location.pathname === "/saved-movies";
    if (!isSavedMovie) {
      const result = savedMovies.some((item) => card.id === item.movieId);
      setIsCardLiked(result);
    }
  }, [savedMovies]);

  const handleOnClick = () => {
    if (!isCardLiked) {
      onLikeClick(card);
      setIsCardLiked(isCardLiked);
    } else {
      handleRemoveMovie(card);
      setIsCardLiked(isCardLiked);
    }
    // setIsCardLiked(!isCardLiked);
  };

  const onDeleteClick = () => {
    handleDeleteMovie(card);
  };

  function transformDuration(duration) {
    const hours = Math.floor(duration / ONE_HOUR);
    const minutes = duration % ONE_HOUR;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <li className="movie">
      <div className="movie__block">
        <div className="movie__info">
          <h2 className="movie__name">{title}</h2>
          <span className="movie__time">{transformDuration(duration)}</span>
        </div>
        {location.pathname === "/movies" ? (
          <button
          aria-label="лайк"
          type="button"
          className={`movie__like${
            !isCardLiked ? "" : "_active"
          }`}
          onClick={handleOnClick}
        />) : ( <button
          aria-label="лайк"
          type="button"
          className="movie__like_delete"
          onClick={onDeleteClick}
        />)}
      </div>
      <Link to={trailerLink} className="movie__link" target="_blank">
        <img src={link} alt={title} className="movie__image" />
      </Link>
    </li>
  );
}
