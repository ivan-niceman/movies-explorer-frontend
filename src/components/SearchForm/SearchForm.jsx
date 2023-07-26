import React from "react";

export default function SearchForm() {
  return (
    <div className="search__block">
      <div className="search__form">
        <input
          type="search"
          className="search__form__input"
          placeholder="Фильм"
        />
        <button className="search__form__btn" />
      </div>
      <div className="switch">
        <input
          type="checkbox"
          id="switch"
          className="switch-input"
          defaultChecked
        />
        <label htmlFor="switch" className="switch-label" />
        <p className="switch-text">Короткометражки</p>
      </div>
    </div>
  );
}
