const BASE_URL = 'https://api.nomoreparties.co/';

export const emailRegExp = /^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-.]{1,}\.[a-zA-Z]{2,5}$/;

const SHORT_DURATION = 40;
const ONE_HOUR = 60;

const UNAUTHORIZED_ERROR = 401;
const CONFLICT_ERROR = 409;

const WINDOW_DESCTOP_S = 1279;
const WINDOW_TABLE_M = 989;
const WINDOW_TABLE_S = 629;

export {
  SHORT_DURATION,
  CONFLICT_ERROR,
  UNAUTHORIZED_ERROR,
  ONE_HOUR,
  WINDOW_DESCTOP_S,
  WINDOW_TABLE_M,
  WINDOW_TABLE_S,
  BASE_URL,
};
