import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { api } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import SearchForm from "../SearchForm/SearchForm";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Error from "../Error/Error";

export default function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [token, setToken] = useState();
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserRes, setEditUserRes] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [profileErr, setProfileErr] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setToken(jwt);
    } else setLoggedIn(false);
    // setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (token) {
      api.setToken(token);
      api.getCurrentUser()
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email, _id: res._id })
          setLoggedIn(true);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [token]);

  function cleanFormMasseges() {
    setEditUserRes('');
    setRegisterError('');
    setLoginError('');
    setProfileErr('');
  }

  function handlerRegUser({ name, email, password }) {
    setIsLoading(true);
    api.register(name, email, password)
      .then((data) => {
        handlerLogIn({ email, password })
      })
      .catch(err => {
        if (err.message === 'Ошибка: 409') {
          setRegisterError('Пользователь с таким email уже существует');
        }
        if (err.message === 'Ошибка: 500') {
          setRegisterError('На сервере произошла ошибка');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handlerLogIn({ email, password }) {
    setIsLoading(true);
    api.authorize(email, password)
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        setToken(token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch(err => {
        if (err.message === 'Ошибка: 401') {
          setLoginError('Вы ввели неправильный логин или пароль');
        }
        if (err.message === 'Ошибка: 500') {
          setLoginError('На сервере произошла ошибка');
        }
      })
      .finally(() => setIsLoading(false))
  }

  function logOut() {
    localStorage.clear();
    setLoggedIn(false);
    api.setToken('');
    navigate('/', { replace: true });
  }

  function handleEditUser({ name, email }) {
    setIsLoading(true);
    api.setUserInfo(name, email)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        setEditUserRes('Информация о пользователе обновлена');
      })
      .catch(err => {
        if (err.message === 'Ошибка: 409') {
          setProfileErr('Пользователь с таким email уже существует');
        } else {
          setProfileErr('При обновлении профиля произошла ошибка');
        }
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  return (
    isLoggedIn === null ? <Preloader /> :
      <CurrentUserContext.Provider value={{ currentUser, token }}>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Main />
                  <Footer />
                </>
              }
            />

            {!isLoggedIn && <Route
              path="/signin"
              element={
                <Login
                  onLogin={handlerLogIn}
                  error={loginError}
                  buttonText={isLoading ? "Войти..." : "Войти"}
                  cleaner={cleanFormMasseges}
                />
              }
            /> }

            {!isLoggedIn && <Route
              path="/signup"
              element={
                <Register
                  onRegister={handlerRegUser}
                  error={registerError}
                  buttonText={
                    isLoading ? "Зарегистрироваться..." : "Зарегистрироваться"
                  }
                  cleaner={cleanFormMasseges}
                />
              }
            /> }

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
                  loggedIn={isLoggedIn}
                  logOut={logOut}
                  onEditUser={handleEditUser}
                  buttonText={isLoading ? 'Сохранить...' : 'Сохранить'}
                  requestErr={profileErr}
                  requestRes={editUserRes}
                  cleaner={cleanFormMasseges}
                />
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                element={
                  <>
                    <Header />
                    <SearchForm />
                    <Movies />
                    <Footer />
                  </>
                }
                loggedIn={isLoggedIn}
                />}
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Header />
                      <SearchForm />
                      <SavedMovies />
                      <Footer />
                    </>
                  }
                  loggedIn={isLoggedIn}
                />
              }
            />

            <Route path={"/*"} element={<Error />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
  );
}
