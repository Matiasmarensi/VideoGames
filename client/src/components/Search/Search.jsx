import style from "./Search.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGamesByQuery } from "../../redux/actions";

const Search = () => {
  const dispatch = useDispatch();
  const [gameSearch, setGameSearch] = useState("");

  useEffect(() => {
    dispatch(getGamesByQuery(gameSearch || ""));
  }, [gameSearch]);

  const handleSearch = (e) => {
    const gameSearch = e.target.value;
    e.preventDefault();
    if (!e) {
      setGameSearch("");
    }
    setGameSearch(gameSearch);
  };

  return (
    <div className={style.container}>
      <input className={style.input} value={gameSearch} type="text" onChange={handleSearch} /> <button>Buscar</button>
    </div>
  );
};

export default Search;
