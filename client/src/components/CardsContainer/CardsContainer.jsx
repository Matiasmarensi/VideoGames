import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";

import style from "./CardsContainer.module.css";
import {
  getGamesByQuery,
  setPlatformFilter,
  setGenreFilter,
  orderGames,
  orderGamesRating,
  getGames,
  sourceFilter,
  deleteGames,
} from "../../redux/actions";
////////////////////////////////////////////////////////
const CardsContainer = ({ loading }) => {
  const games = useSelector((state) => state.videoGames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const filteredGames = useSelector((state) => state.filteredGames);

  const dispatch = useDispatch();
  const selectedGenre = useSelector((state) => state.selectedGenre);
  const [orderBy, setOrderBy] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredGames?.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // const [loading, setLoading] = useState(false);
  /////////////////////////////////
  // useEffect(() => {
  //   setLoading(true);
  //   if (filteredGames.length > 0) {
  //     dispatch(getGames())
  //       .then(() => setLoading(false))
  //       .catch((error) => {
  //         setLoading(false);
  //         console.log("Error:", error);
  //       });
  //   }
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   dispatch(sourceFilter(source));
  // }, [source]);

  const handleSourceFilter = (event) => {
    const source = event.target.value;
    dispatch(sourceFilter(source));
    setSource(source);

    setPage(1);
  };
  ///////////////////////////////////
  // useEffect(() => {
  //   dispatch(getGamesByQuery(search));
  // }, [search]);
  //filtro genres
  // useEffect(() => {
  //   dispatch(setGenreFilter(selectedGenre));
  // }, [selectedGenre]);
  const handleGenreChange = (event) => {
    const selected = event.target.value;
    dispatch(setGenreFilter(selected));
    setPage(1);
  };
  //filtro platforms

  const handleChangePlatform = (event) => {
    const selected = event.target.value;
    dispatch(setPlatformFilter(selected));
    setPage(1);
  };
  //order by name
  // useEffect(() => {
  //   dispatch(orderGames(orderBy));
  // }, [orderBy]);

  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    dispatch(orderGames(orderBy));
    setOrderBy(selectedOrder);
    setPage(1);
  };
  // // order by rankig
  // useEffect(() => {
  //   dispatch(orderGamesRating(orderBy));
  // }, [orderBy]);

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    dispatch(orderGamesRating(orderBy));
    setOrderBy(rating);
    setPage(1);
  };
  //////////////////////////////////
  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Funcion para ir a la página siguiente
  const goToNextPage = () => {
    if (page < Math.ceil(filteredGames.length / itemsPerPage)) {
      setPage(page + 1);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.filters}>
        <div className={style.filter}>
          {/* <label className={style.labelgenre}>Genres:</label> */}
          <select className={style.select} onChange={handleGenreChange}>
            <option disabled selected>
              {" "}
              Genres{" "}
            </option>
            <option value="All">All</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filterplatform}>
          {/* <label className={style.labelplatform}>Platform: </label> */}
          <select className={style.select} onChange={handleChangePlatform}>
            <option disabled selected>
              {" "}
              Platforms{" "}
            </option>
            <option value="All">All</option>

            {platforms.map((platform, index) => (
              <option key={index} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.order}>
          {/* <label className={style.labelorder}>Order by Name:</label> */}
          <select className={style.select} onChange={handleOrderChange}>
            <option disabled selected>
              Order by Name
            </option>
            <option value="Ascendente">Z-A</option>
            <option value="Descendente">A-Z</option>
          </select>
        </div>
        <div className={style.rating}>
          {/* <label className={style.labelorder}>Order by Ranking:</label> */}
          <select className={style.select} onChange={handleRatingChange}>
            <option disabled selected>
              Order by Ranking
            </option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
          {/* <label className={style.labelgenre}>Source:</label> */}

          <select className={style.select} onChange={handleSourceFilter}>
            <option disabled selected>
              Source
            </option>
            <option value="All">All</option>
            <option value="true">Created</option>
            <option value="false">Not Created</option>
          </select>
        </div>
      </div>
      <div className={style.pagination}>
        <span>Page {page}</span>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          🢀
        </button>
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} className={pageNumber === page ? style.bot : ""} onClick={() => setPage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={page === Math.ceil(filteredGames?.length / itemsPerPage)}>
          🢂
        </button>
      </div>
      {loading ? (
        <div className={style.loadercontainer}>
          <div className={style.spinner}></div>
        </div>
      ) : (
        <div className={style.cards}>
          {filteredGames !== null && filteredGames.length > 0 ? (
            filteredGames
              ?.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage)
              .map((game, i) => (
                <Card
                  key={i}
                  id={game.id}
                  name={game.name}
                  image={game.image}
                  rating={game.rating}
                  releaseDate={game.releaseDate}
                  description={game.description}
                  genres={game.genres}
                  created={game.created}
                />
              ))
          ) : (
            <div className={style.noGames}>No se encontraron juegos.</div>
          )}
        </div>
      )}
      <div className={style.pagination2}>
        <span>Page {page}</span>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          🢀
        </button>
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} className={pageNumber === page ? style.bot : ""} onClick={() => setPage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={page === Math.ceil(filteredGames?.length / itemsPerPage)}>
          🢂
        </button>
      </div>
    </div>
  );
};

export default CardsContainer;
