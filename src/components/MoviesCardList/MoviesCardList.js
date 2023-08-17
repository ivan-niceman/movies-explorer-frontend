import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Preloader from "../Preloader/Preloader";
import { BASE_URL } from "../../utils/constants";

export default function MoviesCardList({
  movies,
  isLoading,
  onLikeClick,
  savedMovies,
  handleDeleteMovie,
  handleRemoveMovie,
  isSavedNotFound,
}) {
  const [shownMovies, setShownMovies] = React.useState(0);
  const location = useLocation([]);
  const locationMovies = location.pathname === "/movies";
  const locationSavedMovies = location.pathname === "/saved-movies";

  function displayMovies() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(16);
    } else if (display > 989) {
      setShownMovies(12);
    } else if (display > 629) {
      setShownMovies(8);
    } else if (display < 629) {
      setShownMovies(5);
    }
  }

  React.useEffect(() => {
    displayMovies();
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      displayMovies();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function showMoreMovies() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(shownMovies + 4);
    } else if (display > 989) {
      setShownMovies(shownMovies + 3);
    } else if (display < 989) {
      setShownMovies(shownMovies + 2);
    }
  }

  return (
    <>
      {locationMovies && (
        <>
          {isLoading && <Preloader />}
          <ul className="movies__card-list">
            {movies.slice(0, shownMovies).map((card) => {
              return (
                <div key={card.id}>
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
          {!isLoading && movies.length === 0 && (
            <InfoTooltip errorText={"Ничего не найдено"} />
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
          {!isLoading && (!isSavedNotFound || movies.length > 0) && (
            <ul className="movies__card-list">
              {movies.map((card, _id) => {
                return (
                  <div key={_id}>
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
          {isSavedNotFound && <InfoTooltip errorText={"Ничего не найдено"} />}
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
    </>
  );
}
