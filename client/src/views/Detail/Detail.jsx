import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useEffect } from "react";
import { useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/videogames/${id}`).then((res) => {
      const game = res.data;
      setGame(game);
    });
  }, []);

  console.log(game.genres);
  return (
    <div className={style.detail}>
      <h2>detail</h2>
      <h2>{game.name}</h2>
      <img src={game.image} alt="asdadasds" />
      <h2>{game.rating}</h2>
      <h2>{game.genres}</h2>
      <h2>{game.description}</h2>
      <h2>{game.platforms}</h2>
      <h2>{game.genres}</h2>
    </div>
  );
};

export default Detail;
