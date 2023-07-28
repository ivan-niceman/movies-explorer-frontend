import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import MobileNav from "../MobileNav/MobileNav";

export default function Header() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <header className="header-promo">
          <div className="header-promo-top">
          <Link to="/">
            <img src={logo} alt="логотип" className="header-promo-logo" />
          </Link>
          <span>
            <Link to="/signup" className="header-promo-ident-register">
              Регистрация
            </Link>
            <Link to="/signin" className="header-promo-ident-enter">
              Войти
            </Link>
          </span>
        </div>
        </header>
      ) : (
        <header className="header">
          <Link to="/">
            <img src={logo} alt="логотип" className="header__logo" />
          </Link>
          <MobileNav />
          <nav className="header__nav">
            <Link to="/movies" className="header__link-movies">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__link-save-movies">
              Сохранённые фильмы
            </Link>
            <Link to="/profile" className="header__link-account">
              Аккаунт
            </Link>
          </nav>
        </header>
      )}
    </>
  );
}
