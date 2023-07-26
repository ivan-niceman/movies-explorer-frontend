import { Link } from "react-router-dom";
import React from "react";
import ValidateError from "../../utils/ValidateError/ValidateError";

export default function Profile({ profileNameError }) {
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
  // if (newName.trim().length === 0) {
  //   profileNameError('Введите имя');
  // } else {
  //   profileNameError('');
  // }
}

function handleEditName() {
  setIsEditingName(true);
  setTimeout(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, 0);
}

// function messageError() {
//   if (name.length === 1) {
//     profileNameError.textContent='Введите имя';
//   }
// }

function handleSaveChanges() {
  setIsEditingName(false);
}
function handleKeyDown(e) {
  if (e.key === "Enter") {
    handleSaveChanges();
  }
}

  return (
    <div className="profile">
      <div className="profile__user">
        <h1 className="profile__welcome">Привет, {name}!</h1>
        <form name="login" className="profile__user__form">
          <div className="profile__block__name">
            <label className="ident__input__label">Имя</label>
            {isEditingName ? (
              <input
              ref={nameInputRef}
              name="name"
              type="text"
              className="profile__user__name"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              required
            />
            ) : (
              <input
              name="name"
              type="text"
              className="profile__user__name"
              value={name}
            />
            )}
          </div>
            <span className="input__error error__name__message">{nameError}</span>
          <div className="profile__block__email">
            <label className="ident__input__label">E-mail</label>
              <input
              name="email"
              type="email"
              className="profile__user__email"
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
        <Link to="/signin" className="profile__logout">Выйти из аккаунта</Link>
      </div>
    </div>
  );
}
