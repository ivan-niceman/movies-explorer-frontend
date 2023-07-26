import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import ValidateError from "../../utils/ValidateError/ValidateError";
// import { register } from "../../utils/auth";

export default function Register({ registerUser, onChange, buttonText }) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = ValidateError(name, value);

    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "name":
        setNameError(error);
        break;
      case "email":
        setEmailError(error);
        break;
      case "password":
        setPasswordError(error);
        break;
        default:
      break;
    }
    onChange({
      ...value,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await register(formData.name, formData.email, formData.password);
  //     navigate("/signin");
  //   } catch (error) {
  //     setNameError("Что-то пошло не так. Попробуйте еще раз.");
  //   }
  //   console.log(formData)
  // };

  return (
    <div className="ident ident__register">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="логотип"
            className="ident__header__logo header__logo"
          />
        </Link>

        <p className="ident__welcome">Добро пожаловать!</p>
        <form onSubmit={handleSubmit} name="register" className="ident__form">
          <label className="ident__input__label">Имя</label>
          <input
            name="name"
            type="name"
            className="input"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <span className="input__error">{nameError}</span>
          <label className="ident__input__label">E-mail</label>
          <input
            name="email"
            type="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
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
            minLength={2}
            maxLength={30}
            required
          />
          <span className="input__error">{passwordError}</span>
          <div className="ident__section__button">
        <button type="submit" className="ident__button">
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
    </div>
  );
}
