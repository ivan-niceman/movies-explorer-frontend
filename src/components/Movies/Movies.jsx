import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';
import { useResize } from '../../hooks/useResize';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Search from '../../utils/Search';
import { moviesLocalStorageNames } from '../../utils/constants';
import { MOVIES_CARDS_L, MOVIES_CARDS_M, MOVIES_CARDS_S } from '../../utils/constants';
import { ADD_MOVIES_CARD_L, ADD_MOVIES_CARD_M, ADD_MOVIES_CARD_S } from '../../utils/constants';

export default function Movies() {

  const { width, isScreenS, isScreenM, isScreenL } = useResize();
  const { localMovies, moviesResalt, moviesSearchText, moviesStatusCheckbox } = moviesLocalStorageNames
  const { token } = React.useContext(CurrentUserContext);
  const [cardsNumber, setCardsNumber] = React.useState({ first: '', next: '', });
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [beatfilmMovies, setBeatfilmMovies] = React.useState(JSON.parse(localStorage.getItem(localMovies)) || []);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [shownCardsNumber, setShownCardsNumber] = React.useState(cardsNumber.first);
  const [cardsResalt, setCardsResalt] = React.useState(JSON.parse(localStorage.getItem(moviesResalt)) || {});

  React.useEffect(() => {
    api.setToken(token);
    api.getCards()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => console.log(err));
    if (!beatfilmMovies.length) {
      moviesApi.getCards()
        .then((res) => {
          setBeatfilmMovies(res);
          localStorage.setItem(localMovies, JSON.stringify(res));
        })
        .catch((err) => console.log(err))
        .finally(setIsPreloader(false));
    } else { setIsPreloader(false) };
  }, [])

  React.useEffect(() => {
    if (!cardsResalt.length) {
      setCardsResalt(beatfilmMovies);
    }
  }, [beatfilmMovies])

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
  }, [width])

  React.useEffect(() => {
    setShownCardsNumber(cardsNumber.first)
  }, [cardsNumber])

  function handleNextCards() {
    setShownCardsNumber(shownCardsNumber + cardsNumber.next)
  };

  const searchMovies = new Search(beatfilmMovies);

  function handleSearchMovie(text, statusCheckbox) {
    const searchResalt = searchMovies.search(text, statusCheckbox)
    setCardsResalt(searchResalt);
    localStorage.setItem(moviesResalt, JSON.stringify(searchResalt));
    localStorage.setItem(moviesSearchText, text);
    localStorage.setItem(moviesStatusCheckbox, statusCheckbox);
  };

  function handlerSaveMovie(movie) {
    api.saveMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies])
      })
      .catch((err) => console.log(err))
  }

  function handlerCheckSaveMovie(movie) {
    return savedMovies.some((elem) => elem.movieId === movie.id)
  }

  function handlerDeleteMovie(movie) {
    const id = savedMovies.find((elem) => elem.movieId === movie.id)._id;
    api.deleteCard(id)
      .then(() => {
        setSavedMovies(savedMovies.filter((elem) => elem._id !== id))
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
        onClick={handleNextCards}
        checkSaveMivie={handlerCheckSaveMovie}
        onSaveClick={handlerSaveMovie}
        onDeleteClick={handlerDeleteMovie}
        buttonVisibility={cardsResalt.length > shownCardsNumber}
      /> :
      <></>
      }
    </section>
  )
}