import { HashLink } from "react-router-hash-link";
import textLogo from "../../images/text-logo.svg";

export default function Promo() {
  return (
    <section className="promo">
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
    </section>
  );
}
