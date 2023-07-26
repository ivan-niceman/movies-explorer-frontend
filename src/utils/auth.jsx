export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://api.nice-man.nomoredomain.nomoredomains.work";

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  if (token) {
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(`${BASE_URL}${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

export function authorize(email, password) {
  return makeRequest("/signin", "POST", {
    email: `${email}`,
    password: `${password}`,
  });
}

export function register(name, email, password) {
  return makeRequest("/signup", "POST", {
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
  });
}

export function getUserData(token) {
  return makeRequest("/profile", "GET", null, token);
}
