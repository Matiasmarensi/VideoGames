import style from "./CreateVideogame.module.css";
import { useState, useEffect } from "react";

const CreateVideogame = () => {
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
    const properties = event.target.name;
    const value = event.target.value;
    setNewVideogame({ ...newVideogame, [properties]: value });
  };

  return (
    <div className={style.create}>
      CreateVideogame
      <div>
        <form>
          <label>Name</label>
          <input type="text" placeholder="name" name="name" value={newVideogame.name} onChange={handleChange}></input>
          {/* <label>Image</label>
        <input type="text" placeholder="image" value={newVideogame.background_image}></input> */}
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
          {/* <label>Platform</label>
          <input placeholder="platform" name="platforms" value={newVideogame.platforms} onChange={handleChange}></input>
          <label>Genres</label>
          <input placeholder="genres" name="genres" value={newVideogame.genres} onChange={handleChange}></input> */}
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
