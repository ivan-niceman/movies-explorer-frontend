import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import MobileNav from "../MobileNav/MobileNav";

export default function Header() {
  return (
      <header className="header">
        <Link to="/">
        <img src={logo} alt="логотип" className="header__logo" />
          </Link>
        <MobileNav />
        <nav className="header__nav">
          <Link to="/movies" className="header__link__movies">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header__link__save-movies">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="header__link__account">
            Аккаунт
          </Link>
        </nav>
      </header>
  )}