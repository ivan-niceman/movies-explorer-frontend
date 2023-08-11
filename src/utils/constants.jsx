export const BASE_URL = 'https://api.nice-man.diploma.nomoreparties.sbs';
export const beatfilm_URL = 'https://api.nomoreparties.co/beatfilm-movies';


export const emailRegExp = /^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-.]{1,}\.[a-zA-Z]{2,5}$/.toString().slice(1, -1);

export const SCREEN_S = 750;
export const SCREEN_M = 1278;
export const SCREEN_L = 1280;

export const MOVIES_CARDS_L = 12;
export const MOVIES_CARDS_M = 8;
export const MOVIES_CARDS_S = 5;

export const ADD_MOVIES_CARD_L = 3;
export const ADD_MOVIES_CARD_M = 2;
export const ADD_MOVIES_CARD_S = 1;

export const regEmail = /^[\w]+@[a-zA-Z]+\.[a-zA-Z]{2,30}$/;

export const moviesLocalStorageNames = {
  localMovies: 'beatfilmMovies',
  moviesResalt: 'moviesResalt',
  moviesSearchText: 'moviesSearchText',
  moviesStatusCheckbox: 'moviesStatusCheckbox'
}

export const savedMoviesLocalStorageNames = {
  localMovies: 'savedMovies',
  moviesResalt: 'savedMoviesResalt',
  moviesSearchText: 'savedMoviesSearchText',
  moviesStatusCheckbox: 'savedMoviesStatusCheckbox'
}

export const DURATION_SHORT = 40;