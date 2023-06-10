import style from "./CreateVideogame.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getGenres, getPlatforms } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const CreateVideogame = () => {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  useEffect(() => {
    dispatch(getPlatforms());
  }, []);

  const [newVideogame, setNewVideogame] = useState({
    name: "",
    description: "",
    background_image: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
    created: true,
  });
  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "platforms") {
      value = Array.from(event.target.selectedOptions, (option) => option.value);
    }

    if (property === "genres") {
      value = Array.from(event.target.selectedOptions, (option) => option.value);
    }

    setNewVideogame({ ...newVideogame, [property]: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/videogames", newVideogame).then((res) => alert("videojuego creado"));
  };
  return (
    <div className={style.create}>
      CreateVideogame
      <div>
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input type="text" placeholder="name" name="name" value={newVideogame.name} onChange={handleChange}></input>
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="description"
            value={newVideogame.description}
            onChange={handleChange}
          ></input>
          <label>Release Date</label>
          <input
            placeholder="release date"
            name="releaseDate"
            value={newVideogame.releaseDate}
            onChange={handleChange}
          ></input>
          <label>Rating</label>
          <input placeholder="rating" name="rating" value={newVideogame.rating} onChange={handleChange}></input>
          <label>Platform</label>
          <select name="platforms" multiple value={newVideogame.platforms} onChange={handleChange}>
            {platforms.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <label>Genres</label>
          <select name="genres" multiple value={newVideogame.genres} onChange={handleChange}>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;

{
  /* <label>Image</label>
<input type="text" placeholder="image" value={newVideogame.background_image}></input> */
}
