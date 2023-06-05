import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <Link to="/home" className={style.link}>
        Home
      </Link>
      <Link to="/create" className={style.link}>
        Create
      </Link>
    </div>
  );
};

export default NavBar;
