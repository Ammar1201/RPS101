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
        <Route path="/wiki/:objectName" element={<ObjectDetails setIsLoading={setIsLoading} />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/:mode" element={<PlayerNames setIsLoading={setIsLoading} setMessage={setMessage} />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </Fragment>
  );
}

export default App;