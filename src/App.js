import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Wiki from "./pages/Wiki";
import Play from "./pages/Play";
import ScoreBoard from "./pages/ScoreBoard";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/play" element={<Play />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </Fragment>
  );
}

export default App;