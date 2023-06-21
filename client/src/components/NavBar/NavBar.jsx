import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
const NavBar = () => {
  const location = useLocation();
  return (
    <div className={style.container}>
      <Link to="/home" className={style.link}>
        Home
      </Link>
      <div className={style.search}>{location.pathname === "/home" && <Search />}</div>
      {location.pathname === "/create" && <div className={style.tittle}>Create your own Videogame</div>}
      {location.pathname !== "/create" && (
        <Link to="/create" className={style.link}>
          Create
        </Link>
      )}
    </div>
  );
};

export default NavBar;
