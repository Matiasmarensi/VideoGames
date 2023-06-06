import React from "react";
import style from "./Card.module.css";

export default function Card(props) {
  const genres = props.genres.join("\n");
  return (
    <div className={style.card}>
      <img src={props.image} alt={props.name} className={style.image} />
      <h3 className={style.title}>{props.name}</h3>
      <h4 className={style.rating}>{props.rating}</h4>
      <h4 className={style.releaseDate}>{props.releaseDate}</h4>
      <p className={style.description}>{props.description}</p>
      <div className={style.genres}>
        {genres.split("\n").map((genre, index) => (
          <p key={index}>{genre}</p>
        ))}
      </div>
    </div>
  );
}
