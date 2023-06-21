import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Welcome to our gaming website!</h1>
      <Link to="/home" className={style.link}>
        Get started
      </Link>
    </div>
  );
};

export default Landing;
