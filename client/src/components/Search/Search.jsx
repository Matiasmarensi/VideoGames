import style from "./Search.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getGamesByQuery } from "../../redux/actions";

const Search = () => {
  const dispatch = useDispatch();
  const [gameSearch, setGameSearch] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    const gameSearch = e.target.value;
    e.preventDefault();
    setGameSearch(gameSearch);
  };

  const handleSearchClick = () => {
    dispatch(getGamesByQuery(gameSearch));
    inputRef.current.value = "";
  };

  return (
    <div className={style.container}>
      <input className={style.input} ref={inputRef} type="text" onChange={handleSearch} />
      <button className={style.button} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default Search;
