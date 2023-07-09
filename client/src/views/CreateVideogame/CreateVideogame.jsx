import style from "./CreateVideogame.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getGenres, getPlatforms, createVideogame, getGames } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import validate from "./validate";
const CreateVideogame = () => {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => {
  //     dispatch(getGames());
  //   };
  // }, []);
  // useEffect(() => {
  //   dispatch(getPlatforms());
  // }, []);
  const initialVideogameState = {
    name: "",
    description: "",
    image: "https://avatars.githubusercontent.com/u/57154655?s=280&v=4",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
    created: true,
  };

  const [newVideogame, setNewVideogame] = useState(initialVideogameState);
  /////////////////////////////
  //errorres
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
  });
  ////////////////
  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "image") {
      setNewVideogame((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "platforms") {
      if (checked) {
        setNewVideogame((prevState) => ({
          ...prevState,
          platforms: [...prevState.platforms, value],
        }));
      } else {
        setNewVideogame((prevState) => ({
          ...prevState,
          platforms: prevState.platforms.filter((platform) => platform !== value),
        }));
      }
    } else if (name === "genres") {
      if (checked) {
        setNewVideogame((prevState) => ({
          ...prevState,
          genres: [...prevState.genres, value],
        }));
      } else {
        setNewVideogame((prevState) => ({
          ...prevState,
          genres: prevState.genres.filter((genre) => genre !== value),
        }));
      }
    } else {
      setNewVideogame((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    setErrors(validate({ ...newVideogame, [name]: value }));
  };
  useEffect(() => {
    setErrors(validate(newVideogame));
  }, [newVideogame]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(createVideogame(newVideogame));
      setNewVideogame(initialVideogameState);
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      window.alert("There are errors in the form");
    }
  };

  return (
    <div className={style.create}>
      <div className={style.form}>
        <form onSubmit={submitHandler} className={style.formContainer}>
          <div className={style.column}>
            <div className={style.columnItem}>
              <label>Name</label>
              <input
                type="text"
                placeholder="choose the name of your game"
                name="name"
                value={newVideogame.name}
                onChange={handleChange}
              />
              <p className={style.danger}>{errors.name}</p>
            </div>
            <div className={style.columnItem}>
              <label>Image URL</label>
              <input
                type="text"
                placeholder="Enter the URL of the background image"
                name="image"
                value={newVideogame.image}
                onChange={handleChange}
              />
            </div>
            <div className={style.columnItem}>
              <label>Description</label>
              <textarea
                rows={4}
                cols={40}
                placeholder="Enter a description..."
                name="description"
                value={newVideogame.description}
                onChange={handleChange}
              />
              <p className={style.danger}>{errors.description}</p>
            </div>
            <div className={style.columnItem}>
              <label>Release Date</label>
              <input
                type="date"
                placeholder="release date"
                name="releaseDate"
                value={newVideogame.releaseDate}
                onChange={handleChange}
              />
              <p className={style.danger}>{errors.releaseDate}</p>
            </div>
            <div className={style.columnItem}>
              <label>Rating</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.01"
                name="rating"
                value={newVideogame.rating}
                onChange={handleChange}
              />

              <p className={style.danger}>{errors.rating}</p>
            </div>
            <span>{newVideogame.rating}</span>
          </div>
          <div className={style.column}>
            <div className={style.columnItem1}>
              <label>Platform</label>
              <div className={style.scrollable}>
                <div className={style.platforms}>
                  {platforms.map((platform) => (
                    <label key={platform.id}>
                      <input
                        type="checkbox"
                        name="platforms"
                        value={platform.id}
                        defaultChecked={newVideogame.platforms.includes(platform.id)}
                        onChange={handleChange}
                      />
                      {platform.name}
                    </label>
                  ))}
                </div>
              </div>
              <p className={style.danger}>{errors.platforms}</p>
            </div>
          </div>
          <div className={style.column}>
            <div className={style.columnItem2}>
              <label>Genres</label>
              <div className={style.scrollable}>
                <div className={style.genres}>
                  {genres.map((genre) => (
                    <label key={genre.id}>
                      <input
                        type="checkbox"
                        name="genres"
                        value={genre.id}
                        defaultChecked={newVideogame.genres.includes(genre.id)}
                        onChange={handleChange}
                      />
                      {genre.name}
                    </label>
                  ))}
                </div>
              </div>
              <p className={style.danger}>{errors.genres}</p>
            </div>
          </div>
          <div className={style.button}>
            <button className={style.button} disabled={Object.keys(errors).length > 0} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
