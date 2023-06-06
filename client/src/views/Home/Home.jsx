import style from "./Home.module.css";
import CardsConainter from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames, getGenres } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Home de videojuegos</h1>
      <CardsConainter />
    </div>
  );
};

export default Home;
