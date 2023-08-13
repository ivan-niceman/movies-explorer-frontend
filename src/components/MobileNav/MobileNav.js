import { Link } from "react-router-dom";
import React from "react";

export default function MobileNav() {
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
          <Link to="/" className="mobile-link">
            Главная
          </Link>
          <Link to="#" className="mobile-link">
            Фильмы
          </Link>
          <Link to="#" className="mobile-link">
            Сохранённые фильмы
          </Link>
        </nav>
        <Link to="#" className="footer-mobile-link">
          Аккаунт
        </Link>
      </div>
    </>
  );
}
