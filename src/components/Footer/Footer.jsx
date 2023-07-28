import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragraph">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__block">
        <span className="footer__year">© 2023</span>
        <span className="footer__links">
          <Link
            to="https://practicum.yandex.ru/"
            className="footer__link"
            target="_blank"
          >
            Яндекс.Практикум
          </Link>
          <Link
            to="https://github.com/ivan-niceman"
            className="footer__link"
            target="_blank"
          >
            Github
          </Link>
        </span>
      </div>
    </footer>
  );
}
