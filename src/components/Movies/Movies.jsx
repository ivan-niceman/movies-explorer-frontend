import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ onLikeClick, savedMovies, handleRemoveMovie, isErrorSearch, handleSearch, isNotFound, valueMovies, isLoading, cards, shortDuration, setShortDuration, setValueMovies }) {

  return (
    <section className="movies">
      <SearchForm
        setValue={setValueMovies}
        onSearch={handleSearch}
        value={valueMovies}
        isChecked={shortDuration}
        setIsChecked={setShortDuration}
      />
      <MoviesCardList 
        movies={JSON.parse(localStorage.getItem("moviesByQuery")) || cards}
        isLoading={isLoading}
        isNotFound={isNotFound}
        isErrorSearch={isErrorSearch}
        onLikeClick={onLikeClick}
        savedMovies={savedMovies}
        handleRemoveMovie={handleRemoveMovie}
      />
    </section>
  )
}