import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { setGenreFilter, orderGames } from "../../redux/actions";

const CardsContainer = () => {
  const games = useSelector((state) => state.videoGames);
  const genres = useSelector((state) => state.genres);
  const genreFilter = useSelector((state) => state.genreFilter);
  const dispatch = useDispatch();
  const [gamesToShow, setFilteredGames] = useState([]);

  useEffect(() => {
    if (genreFilter) {
      const gamesToShow = games.filter((game) => game.genres.includes(genreFilter));
      setFilteredGames(gamesToShow);
    } else {
      setFilteredGames(games);
    }
  }, [genreFilter, games]);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    dispatch(setGenreFilter(selectedGenre));
  };
  const [orderBy, setOrderBy] = useState("");

  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    setOrderBy(selectedOrder);
    dispatch(orderGames(selectedOrder));
  };

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <div className={style.filter}>
          <select value={genreFilter} onChange={handleGenreChange}>
            <option value="">All</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className={style.order}>
          <select onChange={handleOrderChange}>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
        </div>
      </div>
      <div className={style.cards}>
        {gamesToShow.map((game) => (
          <Card
            key={game.id}
            name={game.name}
            image={game.image}
            rating={game.rating}
            releaseDate={game.releaseDate}
            description={game.description}
            genres={game.genres}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
