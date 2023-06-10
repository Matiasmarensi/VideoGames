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
      <div>{location.pathname === "/home" && <Search />}</div>

      <Link to="/create" className={style.link}>
        Create
      </Link>
    </div>
  );
};

export default NavBar;
