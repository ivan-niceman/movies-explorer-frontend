import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ moviesData, onClick, buttonVisibility, onSaveClick, checkSaveMovie, onDeleteClick }) {

  return (
    <>
      <ul className="movies__card-list">
      {moviesData.map((movie, index) => (
        <MoviesCard
          key={movie._id || movie.id}
          movie={movie}
          onSaveClick={onSaveClick}
          onDeleteClick={onDeleteClick}
          isSaved = {checkSaveMovie}
        />
      ))}
      </ul>
      {buttonVisibility && (
        <button className="button-more-movies" onClick={onClick}>Ещё</button>
      )}
    </>
  )
}