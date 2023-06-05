import React from "react";
import style from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={style.card}>
      <img src={props.image} alt={props.name} className={style.image} />
      <h3>{props.name}</h3>
    </div>
  );
}
