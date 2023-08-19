import { Link, useNavigate } from "react-router-dom";

export default function Error() {
  let navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <section className="error">
      <div className="error__block">
      <h2 className="error__number">404</h2>
      <p className="error__paragraph">Страница не найдена</p>
      </div>
      <Link onClick={handleGoBack} className="error__back">Назад</Link>
    </section>
  );
}
