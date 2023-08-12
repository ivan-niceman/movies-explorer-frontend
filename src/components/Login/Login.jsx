import { Link } from "react-router-dom";
import React from "react";
import logo from "../../images/logo.svg";
import { useFormValidation } from '../../hooks/useFormValidation';

export default function Login({ loginUser, buttonText, errorMessage, isActiveFormBtn, setErrorMessage }) {

  const { values, handleChange, errors, isValid, resetForm } =
  useFormValidation();

function handleSubmit(e) {
  e.preventDefault();
  loginUser({
    email: values.email,
    password: values.password,
  });
  setErrorMessage("");
}

React.useEffect(() => {
  resetForm();
}, [resetForm]);

  return (
    <section className="ident ident-login">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="логотип"
            className="ident__header-logo header-logo"
          />
        </Link>
        <p className="ident__welcome">Рады видеть!</p>
        <form onSubmit={handleSubmit} name="login" className="ident__form" noValidate>
          <label className="ident-input-label">E-mail</label>
          <input
            name="email"
            type="email"
            className="input"
            value={values.email || ""}
            onChange={handleChange}
            title="Введите минимум 6 символов"
            placeholder="Введите E-mail"
            required
          />
          <span className="input-error">{errors.email}</span>
          <label className="ident-input-label">Пароль</label>
          <input
            name="password"
            type="password"
            className="input"
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Введите пароль"
            required
          />
          <span className="input-error">{errors.password}</span>
          <span className="input-error">{errorMessage}</span>
          <div className="login-section-button">
            <button type="submit" className={
              !isValid
              ? "ident__button ident__button_disabled"
              : "ident__button"
            }
            disabled={!isValid || !isActiveFormBtn} >
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
    </section>
  );
}
