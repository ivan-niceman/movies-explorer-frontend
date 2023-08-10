import { beatfilm_URL } from './constants';

class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  _getHeaders() {
    return {
      "Content-Type": 'application/json'
    };
  }

  _getJson(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    };
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  getCards() {
    return this._request(this._url, {
      headers: this._getHeaders()
    });
  }
}

export const moviesApi = new MoviesApi(beatfilm_URL);
