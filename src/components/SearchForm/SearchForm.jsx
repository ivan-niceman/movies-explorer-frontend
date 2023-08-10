import React from "react";
// import ValidateError from "../../utils/ValidateError/ValidateError";

export default function SearchForm({ searchMovies, text, statusCheckbox }) {
  const [searchText, setSearchText] = React.useState(text || '');
  const [checkboxStatus, setCheckboxStatus] = React.useState(statusCheckbox || false);

  function handleSearchText(e) {
    setSearchText(e.target.value);
  }

  const handleCheckbox = (e) => {
    setCheckboxStatus(e.target.checked);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchText, checkboxStatus);
  };

  return (
    <section className="search-block">
      <form onSubmit={handleSubmit} name="search" className="search-form">
        <input
          name="search"
          type="search"
          value={searchText}
          onChange={handleSearchText}
          className="search-form__input"
          placeholder="Фильм"
          required
        />
        <button type='submit' className="search-form__btn" />
        <div className="switch">
          <input
            type="checkbox"
            id="switch"
            className="switch-input"
            onChange={handleCheckbox}
            defaultChecked
          />
          <label htmlFor="switch" className="switch-label" />
          <p className="switch-text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}
