import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Wiki from "./pages/Wiki";
import Play from "./pages/Play";
import ScoreBoard from "./pages/ScoreBoard";
import Spinner from "./components/utils/Spinner";
import PlayerVsPlayer from "./pages/PlayerVsPlayer";

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
        <Route path="/scoreboard" element={<ScoreBoard />} />
        <Route path="/play-vs-player" element={<PlayerVsPlayer setIsLoading={setIsLoading} />} />
        <Route path="/play-vs-ai" element={<Play />} />
      </Routes>
    </Fragment>
  );
}

export default App;