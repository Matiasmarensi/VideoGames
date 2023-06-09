import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { deleteGame, getGames } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Card(props) {
  const { id } = useParams();
  const genres = props.genres.join("\n");
  const dispatch = useDispatch();
  const handleDeleteGame = () => {
    const confirmed = window.confirm("Are you sure you want to delete this game");

    if (confirmed) {
      dispatch(deleteGame(props.id));
      dispatch(getGames());
    }
  };

  const ratingClass = getRatingClass(props.rating);

  function getRatingClass(rating) {
    if (rating >= 0 && rating < 3.5) {
      return style.bronze;
    } else if (rating >= 3.5 && rating < 4.2) {
      return style.silver;
    } else if (rating >= 4.2 && rating <= 5) {
      return style.gold;
    }
  }
  return (
    <div className={`${style.card} ${ratingClass}`}>
      {props.created && (
        <button onClick={handleDeleteGame} className={style.button}>
          X
        </button>
      )}
      <Link to={`/videogames/${props.id}`}>
        <img src={props.image} alt={props.name} className={style.image} />
        <h3 className={style.title}>{props.name}</h3>
        <h4 className={style.rating}>{props.rating}</h4>
        {/*<h4 className={style.releaseDate}>{props.releaseDate}</h4>
      <p className={style.description}>{props.description}</p> */}
        <div className={style.genres}>
          {genres.split("\n").map((genre, index) => (
            <p key={index}>{genre}</p>
          ))}
        </div>
      </Link>
    </div>
  );
}
