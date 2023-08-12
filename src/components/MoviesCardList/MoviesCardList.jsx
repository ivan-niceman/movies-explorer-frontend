import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import {
  WINDOW_DESCTOP_S,
  WINDOW_TABLE_M,
  WINDOW_TABLE_S,
  BASE_URL,
} from "../../utils/constants";

export default function MoviesCardList({
  movies,
  isLoading,
  isNotFound,
  isErrorSearch,
  onLikeClick,
  savedMovies,
  handleDeleteMovie,
  handleRemoveMovie,
  isSavedNotFound,
}) {
  const [shownMovies, setShownMovies] = React.useState(0);
  const location = useLocation();
  const locationMovies = location.pathname === "/movies";
  const locationSavedMovies = location.pathname === "/saved-movies";

  function displayMovies() {
    const display = window.innerWidth;
    if (display > WINDOW_DESCTOP_S) {
      setShownMovies(16);
    } else if (display > WINDOW_TABLE_M) {
      setShownMovies(12);
    } else if (display > WINDOW_TABLE_S) {
      setShownMovies(8);
    } else if (display < WINDOW_TABLE_S) {
      setShownMovies(5);
    }
  }

  React.useEffect(() => {
    displayMovies();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", displayMovies);
    }, 500);
  });

  function showMoreMovies() {
    const display = window.innerWidth;
    if (display > WINDOW_DESCTOP_S) {
      setShownMovies(shownMovies + 4);
    } else if (display > WINDOW_TABLE_M) {
      setShownMovies(shownMovies + 3);
    } else if (display < WINDOW_TABLE_M) {
      setShownMovies(shownMovies + 2);
    }
  }

  return (
    <>
      {locationMovies && (
        <>
          {isLoading && <Preloader />}
          {isNotFound && !isLoading && (
            <InfoTooltip errorText={"Ничего не найдено"} />
          )}
          {isErrorSearch && !isLoading && !isNotFound && (
            <InfoTooltip
              errorText={
                "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
              }
            />
          )}

          {!isErrorSearch && !isLoading && (
            <ul className="movies__card-list">
              {movies.slice(0, shownMovies).map((card, id) => {
                return (
                  <div key={id}>
                    <MoviesCard
                      title={card.nameRU || card.nameEN}
                      duration={card.duration}
                      link={`${BASE_URL}${card.image.url}` || card.image}
                      isLiked={card.isLiked}
                      trailerLink={card.trailerLink}
                      onLikeClick={() => onLikeClick(card)}
                      card={card}
                      savedMovies={savedMovies}
                      handleRemoveMovie={handleRemoveMovie}
                      handleDeleteMovie={handleDeleteMovie}
                    />
                  </div>
                );
              })}
            </ul>
          )}
          <button
            className={`${
              movies.length > shownMovies
                ? "button-more-movies"
                : "button-more-movies_inactive"
            }`}
            onClick={showMoreMovies}
          >
            Ещё
          </button>
        </>
      )}
      {locationSavedMovies && (
        <>
          {isLoading && <Preloader />}
          {isSavedNotFound && !isLoading && (
            <InfoTooltip errorText={"Ничего не найдено"} />
          )}

          {!isLoading && !isSavedNotFound && (
            <ul className="movies__card-list">
              {movies.map((card) => {
                return (
                  <div key={card._id}>
                    <MoviesCard
                      title={card.nameRU}
                      duration={card.duration}
                      link={card.image}
                      isLiked={card.isLiked}
                      trailerLink={card.trailerLink}
                      card={card}
                      savedMovies={savedMovies}
                      handleDeleteMovie={handleDeleteMovie}
                    />
                  </div>
                );
              })}
            </ul>
          )}
          <button className={`${
            (movies.length > shownMovies && locationMovies) ||
            (locationSavedMovies && isSavedNotFound)
              ? "button-more-movies"
              : "button-more-movies_inactive"
            }` }
            onClick={showMoreMovies}>Ещё</button>
        </>
      )}
    </>
  );
}
