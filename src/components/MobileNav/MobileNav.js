import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function MobileNav() {
  const location = useLocation();

  React.useEffect(() => {
    const buttonBurger = document.querySelector(".burger-menu");
    const menuMobile = document.querySelector(".mobile-menu");
    const overlayMobile = document.querySelector(".mobile-background");
    const buttonCloseMobileMenu = document.querySelector(
      ".mobile-close-button"
    );

    function closeMobileMenu(e, elem) {
      e.classList.remove("mobile-menu_visible");
      elem.classList.remove("mobile-background_visible");
    }

    buttonBurger.addEventListener("click", () => {
      menuMobile.classList.add("mobile-menu_visible");
      overlayMobile.classList.add("mobile-background_visible");
    });

    buttonCloseMobileMenu.addEventListener("click", () => {
      closeMobileMenu(menuMobile, overlayMobile);
    });

    overlayMobile.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        closeMobileMenu(menuMobile, overlayMobile);
      }
    });
  }, []);

  return (
    <>
      <div className="burger-menu" />
      <div className="mobile-background" />
      <div className="mobile-menu">
        <div className="mobile-close-button" />
        <nav className="mobile-nav">
          <Link to="/" className={`mobile-link${location.pathname === "/" ? " mobile-link_active" : ""}`}>
            Главная
          </Link>
          <Link to="/movies" className={`mobile-link${location.pathname === "/movies" ? " mobile-link_active" : ""}`}>
            Фильмы
          </Link>
          <Link to="/saved-movies" className={`mobile-link${location.pathname === "/saved-movies" ? " mobile-link_active" : ""}`}>
            Сохранённые фильмы
          </Link>
        </nav>
        <Link to="/signin" className="footer-mobile-link">
          Аккаунт
        </Link>
      </div>
    </>
  );
}
