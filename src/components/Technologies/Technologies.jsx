export default function Technologies() {
  return (
    <div className="technologies">
      <div className="technilogies__width">
        <h2 className="technologies__title title">Технологии</h2>
      </div>
      <div className="technologies__section">
        <h2 className="technologies__subtitle">7 технологий</h2>
        <p className="technologies__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="technologies__list">
          <li className="technologies__item">HTML</li>
          <li className="technologies__item">CSS</li>
          <li className="technologies__item">JS</li>
          <li className="technologies__item">React</li>
          <li className="technologies__item">Git</li>
          <li className="technologies__item">Express.js</li>
          <li className="technologies__item">mongoDB</li>
        </ul>
      </div>
    </div>
  );
}
