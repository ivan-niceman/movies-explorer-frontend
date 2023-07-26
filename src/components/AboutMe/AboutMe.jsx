import { Link } from "react-router-dom";
import myPhoto from "../../images/my-photo.jpg";
import linkLogo from "../../images/link-portfolio.svg";

export default function AboutProject() {
  return (
    <div className="about-me">
      <h2 className="about-me__title title">Студент</h2>
      <div className="about-me__section">
        <span className="about-me__info">
          <span>
            <h2 className="about-me__name">Иван</h2>
            <h3 className="about-me__profession">
              Фронтенд-разработчик, 34 года
            </h3>
            <p className="about-me__paragraph">
              Я родился в Москве, живу сейчас в Таиланде. Закончил автомобильный
              факультет в Московском государственном индустриальном
              университете. Увлекаюсь спортом. С 2018 года начал увлекаться
              программированием. После самостоятельного обучения по фронтенд
              разработке, начал заниматься фриланс-заказами. В 2023 году успешно
              закончил курс "Веб-разработчик" в Яндекс практикуме.
            </p>
          </span>
          <Link
            to="https://github.com/ivan-niceman"
            className="about-me__github"
            target="_blank"
          >
            Github
          </Link>
        </span>
        <img
          src={myPhoto}
          alt="фото Ивана Снитко"
          className="about-me__photo"
        ></img>
      </div>
      <h2 className="about-me__portfolio">Портфолио</h2>
      <ul className="about-me__list">
        <li className="about-me__item">
          <Link to="https://ivan-niceman.github.io/how-to-learn/" className="about-me__link" target="_blank">
            <h2 className="about-me__subtitle">Статичный сайт</h2>
            <img src={linkLogo} alt="логотип ссылки" className="about-me__link-logo" />
          </Link>
        </li>
        <li className="about-me__item">
          <Link to="https://ivan-niceman.github.io/russian-travel/" className="about-me__link" target="_blank">
            <h2 className="about-me__subtitle">Адаптивный сайт</h2>
            <img src={linkLogo} alt="логотип ссылки" className="about-me__link-logo" />
          </Link>
        </li>
        <li className="about-me__item">
          <Link to="https://ivan-niceman.github.io/mesto-react/" className="about-me__link" target="_blank">
            <h2 className="about-me__subtitle">Одностраничное приложение</h2>
            <img src={linkLogo} alt="логотип ссылки" className="about-me__link-logo" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
