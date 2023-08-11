import { Link } from "react-router-dom";
import React, { useState } from "react";
import { emailRegExp } from '../../utils/constants'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import useForm from '../hooks/useForm'

export default function Profile({ logOut, onEditUser, buttonText, requestErr, requestRes, cleaner }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [initChange, setInitChange] = useState(false);
  const [buttonStatus, setButtonStatus] = React.useState(true);
  const { form, handleChange, errors } = useForm({
    name: currentUser.name,
    email: currentUser.email,
  })

  React.useEffect(() => {
    cleaner();
  },[])

  React.useEffect(() => {
    const err = errors.name === '' || errors.email === ''
    setButtonStatus(!err)
  }, [errors])

  React.useEffect(() => {
    const err = form.name !== currentUser.name || form.email !== currentUser.email
    setButtonStatus(!err)
  }, [form])

  function handleClickEditButton(event) {
    event.preventDefault();
    setInitChange(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onEditUser(form);
    setInitChange(false);
    cleaner();
  }

  function handleLogOut() {
    logOut()
  }

  return (
    <section className="profile">
      <div className="profile__user">
        <h1 className="profile__welcome">Привет, {currentUser.name}!</h1>
        <form name="edit" className="profile__user-form" onSubmit={handleSubmit}>
          <div className="profile__block-name">
            <label className="ident-input-label">Имя</label>
              <input
              name="name"
              type="text"
              className="profile__user-name"
              minLength='2'
              placeholder='Имя'
              value={form.name}
              onChange={handleChange}
              disabled={!initChange}
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
              value={form.email}
              placeholder='E-mail'
              onChange={handleChange}
              pattern={emailRegExp.toString().slice(1,-1)}
              required
              disabled={!initChange}
            />
          </div>
          <span className="input-error error-name-message">{errors.email}</span>
          <span className="input-error error-name-message">{requestErr}</span>
          <span className="input-error error-name-message">{requestRes}</span>
        </form>
      </div>
      <div className="profile__footer">
        {initChange ? (
          <button type="submit" className="profile__save__name" onClick={handleSubmit} disabled={buttonStatus}>
            {buttonText}
          </button>
        ) : (
          <button type="button" className="profile__edit" onClick={handleClickEditButton}>
            Редактировать
          </button>
        )}
        <Link to="/signin" className="profile__logout" onClick={handleLogOut}>Выйти из аккаунта</Link>
      </div>
    </section>
  );
}
