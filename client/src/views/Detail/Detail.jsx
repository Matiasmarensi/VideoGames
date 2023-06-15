import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useEffect, useState } from "react";
import { getGameById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(getGameById(id));
    return () => {
      dispatch(getGameById(""));
    };
  }, [id]);

  // const handleShowMore = () => {
  //   setShowFullDescription(true);
  // };
  console.log(game);
  return (
    <div className={style.detail}>
      <div className={style.container}>
        <h2 className={style.name}>{game.name}</h2>
        <img className={style.image} src={game.image} alt="asdadasds" />
        <div className={style.data}>
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
