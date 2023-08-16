import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import MobileNav from "../MobileNav/MobileNav";

export default function Header({ loggedIn }) {
  const location = useLocation();
  const headerStyle = {
    backgroundColor:
      location.pathname === "/" ? "#073042" : null,
  };
  return (
    <>
      {location.pathname === "/" && !loggedIn ? (
        <header className="header-promo">
          <div className="header-promo-top">
          <Link to="/">
            <img src={logo} alt="логотип" className="header-promo-logo" />
          </Link>
          <MobileNav />
          <span className="header-enter_disable">
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
        <header className="header" style={headerStyle}>
          <div className="header__block">
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
          </div>
        </header>
      )}
    </>
  );
}
