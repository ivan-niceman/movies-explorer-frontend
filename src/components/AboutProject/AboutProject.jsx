export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title title">О проекте</h2>
      <div className="about-project__diploma">
        <span className="about-project__diploma-info">
          <h3 className="about-project__diploma-subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__diploma-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </span>
        <span className="about-project__diploma-info">
          <h3 className="about-project__diploma-subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__diploma-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </span>
      </div>
      <div className="about-project__diploma-deadline">
        <span className="about-project__diploma-time">
          <span className="about-project__diploma-time-progress about-project__diploma-time-backend">1 неделя</span>
          <p className="about-project__diploma-time-paragraph">Back-end</p>
        </span>
        <span className="about-project__diploma-time">
          <span className="about-project__diploma-time-progress about-project__diploma-time-frontend">4 недели</span>
          <p className="about-project__diploma-time-paragraph">Front-end</p>
        </span>
      </div>
    </section>
  )
}