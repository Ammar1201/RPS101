import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Wiki from "./pages/Wiki";
import Play from "./pages/Play";
import ScoreBoard from "./pages/ScoreBoard";
import Spinner from "./components/utils/Spinner";
import PlayerNames from "./components/PlayerNames";
import Player from "./components/Player";
import AI from "./components/AI";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Fragment>
      <Header />
      {isLoading && <Spinner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/:mode" element={<PlayerNames setIsLoading={setIsLoading} />} />
        <Route path="/play/player" element={<Player setIsLoading={setIsLoading} />} />
        <Route path="/play/ai" element={<AI setIsLoading={setIsLoading} />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </Fragment>
  );
}

export default App;