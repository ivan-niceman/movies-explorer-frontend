import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext, useEffect } from "react";
import { useFormValidation } from "../../hooks/useFormValidation.jsx";

export default function Profile({ logOut, updateUser, errorMessage, setErrorMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({
      name: values.name,
      email: values.email,
    });
    setErrorMessage("");
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const requireValidity =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <section className="profile">
      <div className="profile__user">
        <h1 className="profile__welcome">{`Привет, ${currentUser.name}!`}</h1>
        <form name="edit" className="profile__user-form" onSubmit={handleSubmit} noValidate>
          <div className="profile__block-name">
            <label className="ident-input-label">Имя</label>
              <input
              name="name"
              type="text"
              className="profile__user-name"
              minLength='2'
              maxLength="30"
              placeholder='Имя'
              value={values.name || ""}
              onChange={handleChange}
              pattern="[a-zA-ZА-яёЁ\-\s]*"
              required
            />
          </div>
            <span className="input-error error-name-message">{errors.name}</span>
          <div className="profile__block-email">
            <label className="ident-input-label">E-mail</label>
              <input
              name="email"
              type="email"
              className="profile__user-email"
              value={values.email || ""}
              placeholder='E-mail'
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
            />
          </div>
          <span className="input-error error-name-message">{errors.email}</span>
          <span className="input-error error-name-message">{errorMessage}</span>
        </form>
      </div>
      <div className="profile__footer">
          <button type="submit" className="profile__edit" disabled={requireValidity ? true : false}>
            Редактировать
          </button>
        <Link to="/signin" className="profile__logout" onClick={logOut}>Выйти из аккаунта</Link>
      </div>
    </section>
  );
}
