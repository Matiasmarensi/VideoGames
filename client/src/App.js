import "./App.css";
import "./App.css";
import { Route, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import CreateVideogame from "./views/CreateVideogame/CreateVideogame";
import Navbar from "./components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGames, getGenres, getPlatforms } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getGames());
  }, []);
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  useEffect(() => {
    dispatch(getPlatforms());
  }, []);
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/videogames/:id" render={() => <Detail />} />
      <Route path="/create" render={() => <CreateVideogame />} />
      <Route exact path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
