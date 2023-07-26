import { Link } from "react-router-dom";
import React from "react";
import logo from "../../images/logo.svg";
import ValidateError from "../../utils/ValidateError/ValidateError";
// import { authorize } from "../../utils/auth";

export default function Login({ loginUser, buttonText }) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const error = ValidateError(name, value);
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "email":
        setEmailError(error);
        break;
      case "password":
        setPasswordError(error);
        break;
      default:
        break;
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const userData = await authorize(formData.email, formData.password);
  //     localStorage.setItem("jwt", userData.token);
  //     navigate("/profile");
  //   } catch (error) {
  //     setNameError("Что-то пошло не так. Попробуйте еще раз.");
  //   }
  // };

  return (
    <div className="ident ident__login">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="логотип"
            className="ident__header__logo header__logo"
          />
        </Link>
        <p className="ident__welcome">Рады видеть!</p>
        <form onSubmit={handleSubmit} name="login" className="ident__form">
          <label className="ident__input__label">E-mail</label>
          <input
            name="email"
            type="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="input__error">{emailError}</span>
          <label className="ident__input__label">Пароль</label>
          <input
            name="password"
            type="password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="input__error">{passwordError}</span>
          <div className="ident__section__button">
            <button type="submit" className="ident__button">
              {buttonText}
            </button>
            <p className="ident__pararaph">
              Ещё не зарегистрированы?
              <Link to="/signup" className="ident__link">
                &nbsp;Регистрация
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
