import React from "react";

export default function SearchForm() {
  return (
    <section className="search-block">
      <form className="search-form">
        <input
          type="search"
          className="search-form__input"
          placeholder="Фильм"
        />
        <button className="search-form__btn" />
      </form>
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
    </section>
  );
}
