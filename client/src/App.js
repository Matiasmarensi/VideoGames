import "./App.css";
import "./App.css";
import { Route, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import CreateVideogame from "./views/CreateVideogame/CreateVideogame";
import Navbar from "./components/NavBar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/home/:id" render={() => <Detail />} />
      <Route path="/create" render={() => <CreateVideogame />} />
      <Route exact path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
