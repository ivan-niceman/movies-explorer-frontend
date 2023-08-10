import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import ValidateError from "../../utils/ValidateError/ValidateError";
import { emailRegExp } from '../../utils/constants';
import useForm from '../../hooks/useForm'
// import { register } from "../../utils/auth";

export default function Register({ registerUser, buttonText, error, cleaner }) {
  const [buttonStatus, setButtonStatus] = React.useState(true);

  const { form, handleChange, errors } = useForm({
    name: '',
    email: '',
    password: '',
  })

  React.useEffect(() => {
    cleaner();
  },[])

  React.useEffect(() => {
    const err = errors.name === '' && errors.email === '' && errors.password === ''
    setButtonStatus(!err)
  }, [errors])

  const handleSubmit = (e) => {
    e.preventDefault();
    cleaner();
    registerUser(form)
  }

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
            type="name"
            minLength={2}
            maxLength={30}
            className="input"
            value={form.name}
            onChange={handleChange}
            placeholder="Введите имя"
            required
          />
          <span className="input-error">{errors.name}</span>
          <label className="ident-input-label">E-mail</label>
          <input
            name="email"
            type="email"
            className="input"
            value={form.email}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
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
            value={form.password}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            placeholder="Введите пароль"
            required
          />
          <span className="input-error">{errors.password}</span>
          <span className="input-error">{error}</span>
          <div className="register-section-button">
            <button type="submit" className="ident__button" disabled={buttonStatus}>
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
