import { BASE_URL } from './constants';

class Api {
  constructor(url) {
    this._url = url;
    this._token = '';
  }

  _getHeaders() {
    return {
      Authorization: this._token,
      "Content-Type": 'application/json'
    };
  }

  _getJson(res) {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson)
  }

  authorize(email, password) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
  }

  register(name, email, password) {
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });
  }

  getCurrentUser() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    });
  }

  setUserInfo(name, email) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email
      })
    });
  }

  saveMovie(item) {
    const movie = {
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: `https://api.nomoreparties.co/${item.image.url}`,
      trailerLink: item.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`,
      movieId: item.id,
      nameRU: item.nameRU,
      nameEN: item.nameEN
    }

    return this._request(`${this._url}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(movie)
    });
  }


  getCards() {
    return this._request(`${this._url}/movies`, {
      headers: this._getHeaders()
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    });
  }

  setToken(token) {
    this._token = `Bearer ${token}`;
  }
}

export const api = new Api(BASE_URL);
