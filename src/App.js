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
import PlayerVSPlayer from "./components/PlayerVSPlayer";
import AI from "./components/AI";
import Message from "./components/utils/Message";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <Fragment>
      <Header />
      {isLoading && <Spinner />}
      {message && <Message setMessage={setMessage} title='Invalid' messageContent={message} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/:mode" element={<PlayerNames setIsLoading={setIsLoading} />} />
        <Route path="/play/player" element={<PlayerVSPlayer setIsLoading={setIsLoading} setMessage={setMessage} />} />
        <Route path="/play/ai" element={<AI setIsLoading={setIsLoading} />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </Fragment>
  );
}

export default App;