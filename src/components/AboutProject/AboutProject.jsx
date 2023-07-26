export default function AboutProject() {
  return (
    <div className="about-project" id="about-project">
      <h2 className="about-project__title title">О проекте</h2>
      <div className="about-project__diploma">
        <span className="about-project__diploma__info">
          <h3 className="about-project__diploma__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__diploma__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </span>
        <span className="about-project__diploma__info">
          <h3 className="about-project__diploma__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__diploma__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </span>
      </div>
      <div className="about-project__diploma_deadline">
        <span className="about-project__diploma_time">
          <span className="about-project__diploma_time_progress about-project__diploma_time_backend">1 неделя</span>
          <p className="about-project__diploma_time_paragraph">Back-end</p>
        </span>
        <span className="about-project__diploma_time">
          <span className="about-project__diploma_time_progress about-project__diploma_time_frontend">4 недели</span>
          <p className="about-project__diploma_time_paragraph">Front-end</p>
        </span>
      </div>
    </div>
  )
}