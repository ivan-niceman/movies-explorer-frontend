import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { emailRegExp } from '../../utils/constants';
import { useFormValidation } from "../../hooks/useFormValidation";

export default function Register({ registerUser, buttonText, errorMessage, setErrorMessage }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setErrorMessage("");
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="ident ident-register">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="логотип"
            className="ident__header-logo header-logo"
          />
        </Link>

        <p className="ident__welcome">Добро пожаловать!</p>
        <form onSubmit={handleSubmit} name="register" className="ident__form" noValidate>
          <label className="ident-input-label">Имя</label>
          <input
            name="name"
            type="text"
            minLength='2'
            maxLength='30'
            className="input"
            value={values.name || ""}
            onChange={handleChange}
            placeholder="Введите имя"
            pattern="[a-zA-ZА-яёЁ\-\s]*"
            required
          />
          <span className="input-error">{errors.name}</span>
          <label className="ident-input-label">E-mail</label>
          <input
            name="email"
            type="email"
            className="input"
            value={values.email || ""}
            onChange={handleChange}
            minLength='2'
            maxLength='30'
            pattern={emailRegExp.toString().slice(1,-1)}
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
            minLength='2'
            maxLength='30'
            placeholder="Введите пароль"
            required
          />
          <span className="input-error">{errors.password}</span>
          <span className="input-error">{errorMessage}</span>
          <div className="register-section-button">
            <button type="submit" className={
              !isValid
              ? "ident__button ident__button_disabled"
              : "ident__button"
            } disabled={!isValid}>
              {buttonText}
            </button>
            <p className="ident__pararaph">
              Уже зарегистрированы?
              <Link to="/signin" className="ident__link">
                &nbsp;Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
