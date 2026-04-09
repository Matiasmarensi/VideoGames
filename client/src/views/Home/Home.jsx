import style from "./Home.module.css";
import CardsConainter from "../../components/CardsContainer/CardsContainer";
// import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getGames, getGenres, getPlatforms } from "../../redux/actions";

const Home = ({ loading }) => {
 



  return (
    <div className={style.container}>
      <CardsConainter loading={loading} />
    </div>
  );
};

export default Home;
