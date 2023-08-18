import React from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SavedMovies({ savedMovies, handleDeleteMovie, handleSearch, savedResult, isShort, isLoading, isSavedNotFound, isErrorSearch, shortDurationSM, setShortDurationSM, valueMoviesSaved, setValueMoviesSaved, }) {

  return (
    <>
      <Header/>
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
    <Footer/>
    </>
  );
}