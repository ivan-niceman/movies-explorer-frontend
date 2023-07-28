import { Routes, Route, useNavigate } from "react-router-dom";
import React from "react";
import "./App.css";
// import { api } from "../../utils/api";
import * as auth from "../../utils/auth";
// import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";
// import ProtectedRoute from "../../utils/ProtectedRoute/ProtectedRoute";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [likedMovies, setLikedMovies] = React.useState([]);

  const addLikedMovie = (movie) => {
    if (!likedMovies.some((m) => m.id === movie.id)) {
      setLikedMovies([...likedMovies, movie]);
    }
  };


  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const loginUser = (userData) => {
    console.log(userData);
  };

  const registerUser = (userData) => {
    console.log(userData);
  };
  const handleProfileNameError = (errorMessage) => {
    console.log(errorMessage);
  };

  return (
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

        <Route
          path="/signin"
          element={
            <Login
            value={formData}
              onChange={handleFormChange}
              loginUser={loginUser}
              buttonText={isLoading ? "Войти..." : "Войти"}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <Register
              value={formData}
              onChange={handleFormChange}
              registerUser={registerUser}
              buttonText={
                isLoading ? "Зарегистрироваться..." : "Зарегистрироваться"
              }
            />
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile profileNameError={handleProfileNameError} />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              <Header />
              <SearchForm />
              <Movies />
              <Footer />
              <Preloader />
            </>
          }
        />

        <Route
          path="/saved-movies"
          element={
            <>
              <Header />
              <SearchForm />
              <SavedMovies likedMovies={likedMovies} />
              <Footer />
            </>
          }
        />

        <Route path="/error" element={<Error />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
