export default function ValidateError(name, value) {
  switch (name) {
    case "name":
      return value === "" ? "Имя не может быть пустым" : "";
    case "email":
      if (value === "") {
        return "Email не может быть пустым";
      } else if (!isValidEmail(value)) {
        return "Введите корректный адрес электронной почты";
      }
    case "password":
      return value === "" ? "Пароль не может быть пустым" : value.length < 2 ? "Пароль должен содержать минимум 2 символа" : "";
      case "search":
        return value === "" ? "Нужно ввести ключевое слово" : "";
    default:
      return "";
  }
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}