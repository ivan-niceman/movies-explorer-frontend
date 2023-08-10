import { Link } from "react-router-dom";
import React from "react";
import ValidateError from "../../utils/ValidateError/ValidateError";

export default function Profile({ profileNameError, logOut }) {
  const [name, setName] = React.useState('Иван');
const [email, setEmail] = React.useState('pochta@yandex.ru');

const [isEditingName, setIsEditingName] = React.useState(false);
const [nameError, setNameError] = React.useState("");
const nameInputRef = React.useRef(null);

function handleNameChange(e) {
  const newName = e.target.value;
  setName(newName);
  const error = ValidateError("name", newName);
    profileNameError(error);
    setNameError(error);
}

function handleEditName() {
  setIsEditingName(true);
  setTimeout(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, 0);
}

function handleSaveChanges() {
  setIsEditingName(false);
}
function handleKeyDown(e) {
  if (e.key === "Enter") {
    handleSaveChanges();
  }
}
function handleLogOut() {
  logOut()
}

  return (
    <section className="profile">
      <div className="profile__user">
        <h1 className="profile__welcome">Привет, {name}!</h1>
        <form name="login" className="profile__user-form">
          <div className="profile__block-name">
            <label className="ident-input-label">Имя</label>
            {isEditingName ? (
              <input
              ref={nameInputRef}
              name="name"
              type="text"
              className="profile__user-name"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              required
            />
            ) : (
              <input
              name="name"
              type="text"
              className="profile__user-name"
              value={name}
              required
            />
            )}
          </div>
            <span className="input-error error-name-message">{nameError}</span>
          <div className="profile__block-email">
            <label className="ident-input-label">E-mail</label>
              <input
              name="email"
              type="email"
              className="profile__user-email"
              value={email}
            />
          </div>
        </form>
      </div>
      <div className="profile__footer">
        {isEditingName ? (
          <button type="button" className="profile__save__name" onClick={handleSaveChanges} disabled={name.length === 0}>
            Сохранить
          </button>
        ) : (
          <button type="button" className="profile__edit" onClick={handleEditName}>
            Редактировать
          </button>
        )}
        <Link to="/signin" className="profile__logout" onClick={handleLogOut}>Выйти из аккаунта</Link>
      </div>
    </section>
  );
}
