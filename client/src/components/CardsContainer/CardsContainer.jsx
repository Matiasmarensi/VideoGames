import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

// const videogames = [
//   {
//     id: "b3164123-1952-4528-b297-4e4e7a5f195a",
//     created: true,
//     name: "solid",
//     description: "Esta es una descripción de ejemplo del videojuego.",
//     platforms: ["PC", "PlayStation 4", "Xbox One"],
//     image: "https://example.com/image.png",
//     releaseDate: "2023-01-01",
//     rating: 4.5,
//     genres: [
//       {
//         name: "Racing",
//       },
//       {
//         name: "Shooter",
//       },
//       {
//         name: "Adventure",
//       },
//       {
//         name: "Puzzle",
//       },
//     ],
//   },
//   {
//     id: "e46f6fe2-2ec8-4bbb-914a-f706f3f6a9b1",
//     created: true,
//     name: "gra",
//     description: "Esta es una descripción de ejemplo del videojuego.",
//     platforms: ["PC", "PlayStation 4", "Xbox One"],
//     image: "https://example.com/image.png",
//     releaseDate: "2023-01-01",
//     rating: 4.5,
//     genres: [
//       {
//         name: "Racing",
//       },
//       {
//         name: "Shooter",
//       },
//       {
//         name: "Adventure",
//       },
//       {
//         name: "Puzzle",
//       },
//     ],
//   },
//   {
//     id: "5dd7cc77-db12-4ba4-8ab6-41b35a02b959",
//     created: true,
//     name: "fifa",
//     description: "Esta es una descripción de ejemplo del videojuego.",
//     platforms: ["PC", "PlayStation 4", "Xbox One"],
//     image: "https://example.com/image.png",
//     releaseDate: "2023-01-01",
//     rating: 4.5,
//     genres: [
//       {
//         name: "Racing",
//       },
//       {
//         name: "Shooter",
//       },
//       {
//         name: "Adventure",
//       },
//       {
//         name: "Puzzle",
//       },
//     ],
//   },
//   {
//     id: "f61373b6-8014-4c3a-9fbb-9af7c1d55dd4",
//     created: true,
//     name: "zzzzzzzzzzzzzzz",
//     description: "Esta es una descripción de ejemplo del videojuego.",
//     platforms: ["PC", "PlayStation 4", "Xbox One"],
//     image: "https://example.com/image.png",
//     releaseDate: "2023-01-01",
//     rating: 4.5,
//     genres: [],
//   },
//   {
//     id: 3498,
//     name: "Grand Theft Auto V",
//     image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
//     platforms: ["PlayStation 5", "Xbox Series S/X", "PlayStation 4", "PC", "PlayStation 3", "Xbox 360", "Xbox One"],
//     releaseDate: "2013-09-17",
//     rating: 4.47,
//     genres: ["Action", "Adventure"],
//   },
//   {
//     id: 3328,
//     name: "The Witcher 3: Wild Hunt",
//     image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
//     platforms: ["Xbox Series S/X", "PlayStation 4", "Nintendo Switch", "PC", "Xbox One", "PlayStation 5"],
//     releaseDate: "2015-05-18",
//     rating: 4.66,
//     genres: ["Action", "Adventure", "RPG"],
//   },
//   {
//     id: 4200,
//     name: "Portal 2",
//     image: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
//     platforms: ["Xbox 360", "Linux", "macOS", "PlayStation 3", "PC", "Xbox One"],
//     releaseDate: "2011-04-18",
//     rating: 4.61,
//     genres: ["Shooter", "Puzzle"],
//   },
//   {
//     id: 5286,
//     name: "Tomb Raider (2013)",
//     image: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
//     platforms: ["PlayStation 4", "macOS", "PC", "Xbox One", "Xbox 360", "PlayStation 3"],
//     releaseDate: "2013-03-05",
//     rating: 4.05,
//     genres: ["Action", "Adventure"],
//   },
//   {
//     id: 4291,
//     name: "Counter-Strike: Global Offensive",
//     image: "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
//     platforms: ["PC", "Xbox 360", "PlayStation 3"],
//     releaseDate: "2012-08-21",
//     rating: 3.57,
//     genres: ["Action", "Shooter"],
//   },
// ];

const CardsContainer = () => {
  const games = useSelector((state) => state.videoGames);
  return (
    <div className={style.container}>
      {games.map((game) => (
        <Card
          key={game.id}
          name={game.name}
          image={game.image}
          rating={game.rating}
          releaseDate={game.releaseDate}
          description={game.description}
          genres={game.genres}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
