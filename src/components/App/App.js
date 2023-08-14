import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import SearchForm from "../SearchForm/SearchForm";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { getCards } from "../../utils/MoviesApi";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Error from "../Error/Error";
import ProtectedRoute from "../../utils/ProtectedRoute/ProtectedRoute";
import { SHORT_DURATION, CONFLICT_ERROR } from "../../utils/constants";
import * as MainApi from "../../utils/MainApi";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [isActiveFormBtn, setIsActiveFormBtn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedResult, setSavedResult] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isErrorSearch, setIsErrorSearch] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [isSavedNotFound, setIsSavedIsNotFound] = useState(false);
  const [shortDuration, setShortDuration] = useState(
    JSON.parse(localStorage.getItem("shortDuration")) || false,
  );
  const [shortDurationSM, setShortDurationSM] = useState(false);
  const [valueMovies, setValueMovies] = useState(
    JSON.parse(localStorage.getItem("valueMovies")) || "",
  );
  const [valueMoviesSaved, setValueMoviesSaved] = useState("");

  useEffect(() => {
    if (
      (!loggedIn && path === "/movies") ||
      path === "/saved-movies" ||
      path === "/profile" ||
      path === "/signup" ||
      path === "/signin"
    ) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    handleAllMovies();
  }, []);

  function handleAllMovies() {
    setIsLoading(true);
    return getCards()
      .then((res) => {
        setIsAllMovies(res);
        localStorage.setItem("allMovies", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        setIsErrorSearch(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearch(valueMovies, shortDuration) {
    localStorage.setItem("shortDuration", JSON.stringify(shortDuration));
    localStorage.setItem("valueMovies", JSON.stringify(valueMovies));
    const moviesByQuery = isAllMovies.filter((movie) => {
      const movieRu = String(movie.nameRU)
        .toLowerCase()
        .trim()
        .includes(valueMovies.toLowerCase());
      const movieEn = String(movie.nameEN)
        .toLowerCase()
        .trim()
        .includes(valueMovies.toLowerCase());
      const isShort = movie.duration <= SHORT_DURATION;
      if (valueMovies === "") {
        return 0;
      }
      if (shortDuration) {
        return (movieRu || movieEn) && isShort;
      } else {
        return movieRu || movieEn;
      }
    });

    if (moviesByQuery.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    localStorage.setItem("moviesByQuery", JSON.stringify(moviesByQuery));
    setCards(moviesByQuery);
    getSavedMovies();
  }

  function handleSearchSavedMovies(valueMoviesSaved, shortDurationSM) {
    const moviesByQuery = savedMovies.filter((movie) => {
      const movieRu = String(movie.nameRU)
        .toLowerCase()
        .trim()
        .includes(valueMoviesSaved.toLowerCase());
      const movieEn = String(movie.nameEN)
        .toLowerCase()
        .trim()
        .includes(valueMoviesSaved.toLowerCase());
      const isMovieShort = movie.duration <= SHORT_DURATION;
      if (shortDurationSM) {
        return (movieRu || movieEn) && isMovieShort;
      } else {
        return movieRu || movieEn;
      }
    });
    if (moviesByQuery.length === 0) {
      setIsSavedIsNotFound(true);
    } else {
      setIsSavedIsNotFound(false);
    }
    localStorage.setItem(
      "moviesByQuerySavedMovies",
      JSON.stringify(moviesByQuery),
    );
    setSavedResult(moviesByQuery);
  }

  function handleDeleteMovie(movie) {
    const token = localStorage.getItem("token");
    return MainApi.removeMovie(movie._id, token)
      .then(() => {
        const newMoviesList = savedMovies.filter((res) => {
          if (movie.id === res.movieId || movie.movieId === res.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedResult(newMoviesList);
        setSavedMovies(newMoviesList);
        localStorage.setItem("savedMovie", JSON.stringify(newMoviesList));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardAdd(card) {
    const token = localStorage.getItem("token");
    MainApi.addNewMovie(card, token)
      .then((newMovie) => {
        const newSavedMovies = [...savedMovies, newMovie];
        setSavedMovies(newSavedMovies);
        setSavedResult(newSavedMovies);
        localStorage.setItem("savedMovie", JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSavedMovies() {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    return MainApi.getSavedMovies(token)
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem("savedMovie", JSON.stringify(res));
        setSavedResult(res);
      })
      .catch((err) => {
        console.log(err);
        setIsErrorSearch(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRemoveMovie(movie) {
    const token = localStorage.getItem("token");
    const removeMovie = savedMovies.find((item) => movie.id === item.movieId);
    return MainApi.removeMovie(removeMovie._id, token)
      .then(() => {
        const newMoviesList = savedMovies.filter((res) => {
          if (movie.id === res.movieId || movie.movieId === res.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
        setSavedResult(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateUser({ name, email }) {
    const token = localStorage.getItem("token");
    MainApi.updateUser(name, email, token)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
        setErrorMessage("Данные обновлены!");
      })
      .catch((err) => {
        if (err === CONFLICT_ERROR) {
          setErrorMessage("Пользователь с таким email уже существует");
        } else {
          setErrorMessage("При регистрации пользователя произошла ошибка");
        }
      });
  }

  function logOut() {
    navigate("/");
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    setValueMovies("");
    setIsNotFound(false);
    setIsErrorSearch(false);
    setShortDuration(false);
    setCards([]);
  }

  useEffect(() => {
    setErrorMessage("");
  }, [location]);

  const registerUser = ({ name, email, password }) => {
    MainApi.register(name, email, password)
      .then((res) => {
        setCurrentUser(res);
        return loginUser({ email, password });
      })
      .catch((err) => {
        if (err === CONFLICT_ERROR) {
          setErrorMessage("Пользователь с таким email уже существует");
        } else {
          setErrorMessage("При регистрации пользователя произошла ошибка");
        }
      });
  };

  const loginUser = ({ email, password }) => {
    setIsActiveFormBtn(false);
    MainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setCurrentUser(data);
        navigate("/movies", { replace: true });
        getSavedMovies();
        setIsActiveFormBtn(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setErrorMessage("Вы ввели неправильный логин или пароль");
        setIsActiveFormBtn(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.getUserData(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            navigate(location);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      MainApi.getUserData(token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <Login
                isActiveFormBtn={isActiveFormBtn}
                loginUser={loginUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                buttonText={isLoading ? "Войти..." : "Войти"}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Register
                registerUser={registerUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                buttonText={
                  isLoading ? "Зарегистрироваться..." : "Зарегистрироваться"
                }
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Header />
                    <Profile />
                  </>
                }
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                updateUser={updateUser}
                loggedIn={loggedIn}
                logOut={logOut}
              />
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                savedMovies={savedMovies}
                element={
                  <>
                    <Header />
                    <SearchForm />
                    <Movies />
                    <Footer />
                  </>
                }
                loggedIn={loggedIn}
                onLikeClick={handleCardAdd}
                handleRemoveMovie={handleRemoveMovie}
                getSavedMovies={getSavedMovies}
                handleSearch={handleSearch}
                valueMovies={valueMovies}
                setValueMovies={setValueMovies}
                shortDuration={shortDuration}
                setShortDuration={setShortDuration}
                cards={cards}
                isLoading={isLoading}
                isNotFound={isNotFound}
                isErrorSearch={isErrorSearch}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                savedResult={savedResult}
                handleSearch={handleSearchSavedMovies}
                element={
                  <>
                    <Header />
                    <SearchForm />
                    <SavedMovies />
                    <Footer />
                  </>
                }
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                handleDeleteMovie={handleDeleteMovie}
                valueMoviesSaved={valueMoviesSaved}
                setValueMoviesSaved={setValueMoviesSaved}
                shortDurationSM={shortDurationSM}
                setShortDurationSM={setShortDurationSM}
                isLoading={isLoading}
                isSavedNotFound={isSavedNotFound}
                setIsSavedIsNotFound={setIsSavedIsNotFound}
                isErrorSearch={isErrorSearch}
                getSavedMovies={getSavedMovies}
                setErrorMessage={setErrorMessage}
              />
            }
          />

          <Route path={"/*"} element={<Error />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}
