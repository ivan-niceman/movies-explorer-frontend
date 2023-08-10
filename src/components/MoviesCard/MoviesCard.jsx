import React from "react";
import { Link } from "react-router-dom";

export default function MoviesCard({ movie, isSaved, onSaveClick, onDeleteClick }) {
  const location = React.useLocation();

  const card = {
    nameRU: movie.nameRU,
    duration: movie.duration,
    image: movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image,
    trailerLink: movie.trailerLink
  };

  function handlerSaveButton() {
    onSaveClick(movie)
  }

  function handlerDeleteButton() {
    onDeleteClick(movie)
  }

  return (
    <li className="movie">
      <div className="movie__block">
        <div className="movie__info">
          <h2 className="movie__name">{card.nameRU}</h2>
          <span className="movie__time">
            {Math.floor(card.duration / 60)}ч
            {card.duration - 60 * Math.floor(card.duration / 60)}м
          </span>
        </div>
        {location.pathname === "/movies" &&
          isSaved(movie) ?
          <button
          aria-label="лайк"
          type="button"
          className={`movie__like movie__like_active`}
          onClick={handlerDeleteButton}
        /> :
        <button
          aria-label="лайк"
          type="button"
          className={`movie__like`}
          onClick={handlerSaveButton}
        />
        }
        {location.pathname === "/saved-movies" &&
          <button
            aria-label="лайк"
            type="button"
            className={`movie__like movie__like_active`}
            onClick={handlerDeleteButton}
          />
        }
      </div>
      <Link href={card.trailerLink} target="_blank">
        <img src={card.image} alt={card.nameRU} className="movie__image" />
      </Link>
    </li>
  );
}
