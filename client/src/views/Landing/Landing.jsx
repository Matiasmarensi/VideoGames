import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Landing asdasd asdsa</h1>
      <Link to="/home" className={style.link}>
        Home
      </Link>
    </div>
  );
};

export default Landing;
