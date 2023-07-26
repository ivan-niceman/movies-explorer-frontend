import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../images/logo.svg";
import textLogo from "../../images/text-logo.svg";

export default function Promo() {
  return (
    <header className="promo">
      <div className="promo__top">
        <Link to="/">
          <img src={logo} alt="логотип" className="promo__logo" />
        </Link>
        <span className="promo__enter">
          <Link to="/signup" className="promo__ident-register">
            Регистрация
          </Link>
          <Link to="/signin" className="promo__ident-enter">
            Войти
          </Link>
        </span>
      </div>
      <div className="promo__block">
        <div className="promo__info">
          <span className="promo__info-left">
            <span>
              <h1 className="promo__info-title">
                Учебный проект студента факультета Веб&#8209;разработки.
              </h1>
              <p className="promo__info-paragraph">
                Листайте ниже, чтобы узнать больше про этот проект и его
                создателя.
              </p>
            </span>
            <HashLink
              smooth
              to="#about-project"
              className="promo__info-link-more"
            >
              Узнать больше
            </HashLink>
          </span>
          <img src={textLogo} className="promo__info-text-logo" />
        </div>
      </div>
    </header>
  );
}
