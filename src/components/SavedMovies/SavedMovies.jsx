import React, { useEffect } from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({ savedMovies, handleDeleteMovie, handleSearch, savedResult, isShort, isLoading, isSavedNotFound, isErrorSearch, shortDurationSM, setShortDurationSM, getSavedMovies, setIsSavedIsNotFound, valueMoviesSaved, setValueMoviesSaved, }) {

    useEffect(() => {
      getSavedMovies();
      setValueMoviesSaved("");
      setShortDurationSM(false);
      setIsSavedIsNotFound(false);
    }, []);

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
        value={valueMoviesSaved}
        setValue={setValueMoviesSaved}
        checkBox={isShort}
        isChecked={shortDurationSM}
        setIsChecked={setShortDurationSM}
      />
      <MoviesCardList
        movies={savedResult}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        isLoading={isLoading}
        isSavedNotFound={isSavedNotFound}
        isErrorSearch={isErrorSearch}
      />
    </section>
  );
}