import React from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import movieImage from '../../images/pic__COLOR_pic.jpg'

export default function Movies() {
  const moviesData = [
    {
      id: 1,
      cardName: "33 слова о дизайне",
      cardTime: "1ч 14м",
      cardLink: movieImage,
    },
    {
      id: 2,
      cardName: "33 слова о дизайне",
      cardTime: "1ч 14м",
      cardLink: movieImage,
    },
    {
      id: 3,
      cardName: "33 слова о дизайне",
      cardTime: "1ч 14м",
      cardLink: movieImage,
    },
    {
      id: 4,
      cardName: "33 слова о дизайне",
      cardTime: "1ч 14м",
      cardLink: movieImage,
    },
    {
      id: 5,
      cardName: "33 слова о дизайне",
      cardTime: "1ч 14м",
      cardLink: movieImage,
    },
    {
      id: 6,
      cardName: "33 слова о дизайне",
      cardTime: "1ч 14м",
      cardLink: movieImage,
    },
    {
      id: 7,
      cardName: "33 слова о дизайне",
      cardTime: "1ч 14м",
      cardLink: movieImage,
    },
  ];

  return (
    <div className="movies">
      <MoviesCardList moviesData={moviesData} />
    </div>
  )
}