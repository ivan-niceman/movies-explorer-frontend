import React from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function SavedMovies({ likedMovies }) {
  const likedMoviesData = likedMovies ? likedMovies.filter(movie => movie.isLiked) : [];
  // const likedMoviesData = Array.isArray(likedMovies) ? likedMovies.filter(movie => movie.isLiked) : [];

  // const likedMoviesData = [];


  return (
    <div className="movies">
      <MoviesCardList likedMovies={likedMoviesData} />
    </div>
  );
}