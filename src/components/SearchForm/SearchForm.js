import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchForm({
  onSearch,
  value,
  setValue,
  isChecked,
  setIsChecked,
}) {
  const [valueError, setValueError] = useState(false);
  const location = useLocation();
  const locationSavedMovies = location.pathname === "/saved-movies";

  const handleCheckboxChange = (evt) => {
    setIsChecked(evt.target.checked);
    submit(evt.target.checked);
  };

  function handleChange(event) {
    setValue(event.target.value);
  }

  const submit = (checked) => {
    if (locationSavedMovies) {
      onSearch(value, checked);
    } else {
      if (value < 1) {
        setValueError(true);
        onSearch(value, checked);
      } else {
        setValueError(false);
        onSearch(value, checked);
      }
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(isChecked);
  };

  return (
    <section className="search-block">
      <form onSubmit={handleSubmit} name="search" className="search-form">
        <div className="search-form__block">
          <input
            name="search"
            type="search"
            value={value}
            onChange={handleChange}
            className="search-form__input"
            placeholder="Фильм"
          />
          <button type="submit" className="search-form__btn" />
        </div>
        {valueError && (
            <span className="input-error">Введите ключевое слово</span>
          )}
        <div className="switch">
          <input
            type="checkbox"
            id="switch"
            className="switch-input"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          <label htmlFor="switch" className="switch-label" />
          <p className="switch-text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}
