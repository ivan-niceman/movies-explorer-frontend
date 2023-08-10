import React from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

import { api } from '../../utils/MainApi';
import { useResize } from '../../hooks/useResize';
import Search from '../../utils/Search';
import { savedMoviesLocalStorageNames } from '../../utils/constants';
import { MOVIES_CARDS_L, MOVIES_CARDS_M, MOVIES_CARDS_S } from '../../utils/constants';
import { ADD_MOVIES_CARD_L, ADD_MOVIES_CARD_M, ADD_MOVIES_CARD_S } from '../../utils/constants';

export default function SavedMovies() {
  const { width, isScreenS, isScreenM, isScreenL } = useResize();
  const { moviesSearchText, moviesStatusCheckbox } = savedMoviesLocalStorageNames;
  const [cardsNumber, setCardsNumber] = React.useState({ first: 12, next: 3, });
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [shownCardsNumber, setShownCardsNumber] = React.useState(cardsNumber.first);
  const [cardsResalt, setCardsResalt] = React.useState([]);

  React.useEffect(() => {
    api.getCards()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => console.log(err))
      .finally(setIsPreloader(false));
  }, []);

  React.useEffect(() => {
    if (!cardsResalt.length) {
      setCardsResalt(savedMovies);
    }
  }, [savedMovies]);

  React.useEffect(() => {
    if (isScreenS) {
      setCardsNumber({
        first: MOVIES_CARDS_S,
        next: ADD_MOVIES_CARD_S,
      })
    } else if (isScreenM) {
      setCardsNumber({
        first: MOVIES_CARDS_M,
        next: ADD_MOVIES_CARD_M,
      })
    } else if (isScreenL) {
      setCardsNumber({
        first: MOVIES_CARDS_L,
        next: ADD_MOVIES_CARD_L,
      })
    }
  }, [width]);

  React.useEffect(() => {
    setShownCardsNumber(cardsNumber.first)
  }, [cardsNumber])

  function handleNextCards() {
    setShownCardsNumber(shownCardsNumber + cardsNumber.next)
  };

  const searchMovies = new Search(savedMovies);

  function handleSearchMovie(text, statusCheckbox) {
    const searchResalt = searchMovies.search(text, statusCheckbox)
    setCardsResalt(searchResalt);
    localStorage.setItem(moviesSearchText, text);
    localStorage.setItem(moviesStatusCheckbox, statusCheckbox);
  };

  function handlerDeleteMovie(movie) {
    api.deleteCard(movie._id)
      .then(() => {
        const filtedList = savedMovies.filter((elm) => elm._id !== movie._id)
        setSavedMovies(filtedList);
        setCardsResalt(filtedList);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="movies">
      <SearchForm
        onSearchMovie={handleSearchMovie}
        text={localStorage.getItem(moviesSearchText)}
        statusCheckbox={localStorage.getItem(moviesStatusCheckbox) === 'true' ? true : false}
      />
      {isPreloader ? <Preloader /> : cardsResalt.length ?
      <MoviesCardList
        cards={cardsResalt.slice(0, shownCardsNumber)}
        onDeleteClick={handlerDeleteMovie}
        onClick={handleNextCards}
        buttonVisibility={cardsResalt.length > shownCardsNumber}
      /> : <></>
    }
    </section>
  );
}