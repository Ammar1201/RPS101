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
import Message from "./components/utils/Message";
import ObjectDetails from "./pages/ObjectDetails";
import FullScreenMessage from "./components/utils/FullScreenMessage";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fullScreenMessage, setFullScreenMessage] = useState('');
  return (
    <Fragment>
      <Header />
      {fullScreenMessage && <FullScreenMessage messageContent={fullScreenMessage} setFullScreenMessage={setFullScreenMessage} />}
      {message && <Message setMessage={setMessage} title='Invalid' messageContent={message} />}
      {isLoading && <Spinner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/wiki/:objectName" element={<ObjectDetails setIsLoading={setIsLoading} />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/:mode" element={<PlayerNames setIsLoading={setIsLoading} setMessage={setMessage} setFullScreenMessage={setFullScreenMessage} />} />
        <Route path="/scoreboard" element={<ScoreBoard setIsLoading={setIsLoading} />} />
      </Routes>
    </Fragment>
  );
}

export default App;