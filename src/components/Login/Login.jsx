import { Link } from "react-router-dom";
import React from "react";
import logo from "../../images/logo.svg";
import { emailRegExp } from '../../utils/constants';
import useForm from '../../hooks/useForm';

export default function Login({ onLogin, buttonText, error, cleaner }) {
  const [buttonStatus, setButtonStatus] = React.useState(true);
  const { form, handleChange, errors } = useForm({
    email: '',
    password: ''
  })

  React.useEffect(() => {
    cleaner();
  },[])

  React.useEffect(() => {
    const err = errors.email === '' && errors.password === ''
    setButtonStatus(!err)
  }, [errors])

  const handleSubmit = (e) => {
    e.preventDefault();
    cleaner();
    onLogin(form)
  }

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
            minLength={5}
            maxLength={30}
            className="input"
            value={form.email}
            onChange={handleChange}
            pattern={emailRegExp.toString().slice(1,-1)}
            title="Введите минимум 6 символов"
            placeholder="Введите E-mail"
            required
          />
          <span className="input-error">{errors.email}</span>
          <label className="ident-input-label">Пароль</label>
          <input
            name="password"
            type="password"
            minLength={2}
            maxLength={30}
            className="input"
            value={form.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            required
          />
          <span className="input-error">{errors.password}</span>
          <span className="input-error">{error}</span>
          <div className="login-section-button">
            <button type="submit" className="ident__button" disabled={buttonStatus}>
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
