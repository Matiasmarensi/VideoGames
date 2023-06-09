import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useEffect, useState } from "react";
import { getGameById, getGames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     setLoading(true);

  //     dispatch(getGames())
  //       .then(() => setLoading(false))
  //       .catch((error) => {
  //         setLoading(false);
  //         console.log("Error:", error);
  //       });
  //   }, []);
  useEffect(() => {
    setLoading(true);
    dispatch(getGameById(id))
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error);
      });
  }, []);

  // const handleShowMore = () => {
  //   setShowFullDescription(true);
  // };

  return (
    <div className={style.detail}>
      {loading ? (
        <div className={style.loadercontainer}>
          <div className={style.spinner}></div>
        </div>
      ) : (
        <div className={style.container}>
          <h2 className={style.name}>
            ID {game.id}
            {" - "}
            {game.name}
          </h2>
          <img className={style.image} src={game.image} alt={`${game.name}`} />
          <div className={style.data}>
            <div className={style.released}>Released: {game.releaseDate ? game.releaseDate : "No date"}</div>

            <h2 className={style.rating}>Rating: {game.rating}</h2>
            <div className={style.description} dangerouslySetInnerHTML={{ __html: game.description }}></div>
            <div className={style.platforms}>
              Platforms:{" "}
              {game.platforms?.map((platform) => (
                <div key={platform}>{platform}</div>
              ))}
            </div>
            <div className={style.genres}>
              Genres:{" "}
              {game.genres?.map((genre) => (
                <div key={genre}>{genre}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

{
  /* <div className={style.description}>
  {showFullDescription ? (
    <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
  ) : (
    <div>
      {game.description?.slice(0, 100)}
      {!showFullDescription && game.description?.length > 100 && (
        <button className={style.showMoreButton} onClick={handleShowMore}>
          Ver más
        </button>
      )}
    </div>
  )}
</div> */
}
