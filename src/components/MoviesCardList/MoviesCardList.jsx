import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ moviesData }) {
  if (!Array.isArray(moviesData) || moviesData.length === 0) {
    return moviesData;
  }

  return (
    <>
      <ul className="movies__card__list">
      {moviesData.map((movie) => (
        <MoviesCard
          key={movie.id}
          cardName={movie.cardName}
          cardTime={movie.cardTime}
          cardLink={movie.cardLink}
        />
      ))}
      </ul>
      <button className='button__more-movies'>Ещё</button>
    </>
  )
}