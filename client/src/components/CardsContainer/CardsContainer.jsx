import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { setGenreFilter, orderGames, orderGamesRating } from "../../redux/actions";

const CardsContainer = () => {
  const games = useSelector((state) => state.videoGames);
  const genres = useSelector((state) => state.genres);
  const filteredGames = useSelector((state) => state.filteredGames);
  const genreFilter = useSelector((state) => state.genreFilter);
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    dispatch(setGenreFilter(selectedGenre));
  }, [selectedGenre]);

  const handleGenreChange = (event) => {
    const selected = event.target.value;
    setSelectedGenre(selected);
  };
  useEffect(() => {
    dispatch(orderGames(orderBy));
  }, [orderBy]);
  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    setOrderBy(selectedOrder);
  };

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    setOrderBy(rating);
    dispatch(orderGamesRating(rating));
  };

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <div className={style.filter}>
          <label className={style.labelgenre}>Genres:</label>
          <select onChange={handleGenreChange}>
            <option value="All">All</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.order}>
          <label className={style.labelorder}>Order by Name:</label>
          <select onChange={handleOrderChange}>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
        </div>
        <div className={style.rating}>
          <label className={style.labelorder}>Order by Ranking:</label>
          <select onChange={handleRatingChange}>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
        </div>
      </div>
      <div className={style.cards}>
        {filteredGames.length
          ? filteredGames.map((game) => (
              <Card
                id={game.id}
                key={game.id}
                name={game.name}
                image={game.image}
                rating={game.rating}
                releaseDate={game.releaseDate}
                description={game.description}
                genres={game.genres}
              />
            ))
          : games.map((game) => {
              return (
                <Card
                  id={game.id}
                  key={game.id}
                  name={game.name}
                  image={game.image}
                  rating={game.rating}
                  releaseDate={game.releaseDate}
                  description={game.description}
                  genres={game.genres}
                />
              );
            })}
      </div>
    </div>
  );
};

export default CardsContainer;
