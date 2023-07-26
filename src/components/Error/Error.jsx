import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="error">
      <div className="error__block">
      <h2 className="error__number">404</h2>
      <p className="error__paragraph">Страница не найдена</p>
      </div>
      <Link to="/" className="error__back">Назад</Link>
    </div>
  );
}
