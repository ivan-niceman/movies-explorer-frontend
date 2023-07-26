import { Link } from "react-router-dom";
import React from "react";

export default function MobileNav() {
  React.useEffect(() => {
    const buttonBurger = document.querySelector(".burger__menu");
    const menuMobile = document.querySelector(".mobile__menu");
    const overlayMobile = document.querySelector(".mobile__background");
    const buttonCloseMobileMenu = document.querySelector(
      ".mobile__close-button"
    );

    function closeMobileMenu(e, elem) {
      e.classList.remove("mobile__menu_visible");
      elem.classList.remove("mobile__background_visible");
    }

    buttonBurger.addEventListener("click", () => {
      menuMobile.classList.add("mobile__menu_visible");
      overlayMobile.classList.add("mobile__background_visible");
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
      <div className="burger__menu" />
      <div className="mobile__background" />
      <div className="mobile__menu">
        <div className="mobile__close-button" />
        <nav className="mobile__nav">
          <Link to="/" className="mobile__link">
            Главная
          </Link>
          <Link to="#" className="mobile__link">
            Фильмы
          </Link>
          <Link to="#" className="mobile__link">
            Сохранённые фильмы
          </Link>
        </nav>
        <Link to="#" className="footer__mobile__link">
          Аккаунт
        </Link>
      </div>
    </>
  );
}
