import React from "react";

export default function MoviesCard({ cardName, cardTime, cardLink }) {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  React.useEffect(() => {
    const storedLikedState = localStorage.getItem("likedMovies");
    setIsLiked(storedLikedState === "true");
  }, []);

  React.useEffect(() => {
    localStorage.setItem("likedMovies", isLiked);
  }, [isLiked]);

  return (
    <li className="movie">
      <div className="movie__block">
        <div className="movie__info">
          <h2 className="movie__name">{cardName}</h2>
          <span className="movie__time">{cardTime}</span>
        </div>
        <button
          aria-label="лайк"
          type="button"
          className={`movie__like ${isLiked ? "movie__like_active" : ''}`}
          onClick={handleLikeClick}
        />
      </div>
      <img src={cardLink} alt={cardName} className="movie__image" />
    </li>
  );
}
