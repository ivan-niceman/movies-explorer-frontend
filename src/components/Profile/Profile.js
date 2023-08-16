import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

export default function Profile({
  logOut,
  updateUser,
  errorMessage,
  setErrorMessage,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [updatedName, setUpdatedName] = useState(currentUser.name);
  const [isEditMode, setIsEditMode] = useState(false);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

    const nameInputRef = useRef(null);

    const toggleEditMode = () => {
      if (!isEditMode) {
        resetForm({
          name: currentUser.name,
          email: currentUser.email,
        });
        setErrorMessage("");
      }
      setIsEditMode(!isEditMode);
    };

    function handleSubmit(e) {
      e.preventDefault();
      updateUser({
        name: values.name,
        email: values.email,
      });
      setErrorMessage("");
      toggleEditMode();
    }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (isEditMode && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    setUpdatedName(values.name || currentUser.name);
  }, [values.name, currentUser.name]);


  return (
    <section className="profile">
      <div className="profile__user">
        <h1 className="profile__welcome">{`Привет, ${isEditMode ? values.name || currentUser.name : currentUser.name}!`}</h1>
        <form
          name="edit"
          className="profile__user-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="profile__block-name">
            <label className="ident-input-label">Имя</label>
            <input
              name="name"
              type="text"
              className="profile__user-name"
              minLength="2"
              maxLength="30"
              placeholder="Имя"
              value={isEditMode ? values.name || "" : currentUser.name}
              onChange={handleChange}
              pattern="[a-zA-ZА-яёЁ\-\s]*"
              readOnly={!isEditMode}
              ref={nameInputRef}
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
              value={isEditMode ? values.email || "" : currentUser.email}
              placeholder="E-mail"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              readOnly={!isEditMode}
              required
            />
          </div>
          <span className="input-error error-name-message">{errors.email}</span>
          <span className="input-error error-name-message">{errorMessage}</span>
          <div className="profile__footer">
        {isEditMode ? (
          <button
            type="submit"
            className="profile__edit"
            disabled={!isValid}
          >
            Сохранить
          </button>
        ) : (
          <button
            type="submit"
            className="profile__edit"
            onClick={toggleEditMode}
          >
            Редактировать
          </button>
        )}
        <Link to="/signin" className="profile__logout" onClick={logOut}>
          Выйти из аккаунта
        </Link>
      </div>
        </form>
      </div>
    </section>
  );
}
