import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PlayerVsPlayer from './PlayerVsPlayer';
import PlayerVsAI from './PlayerVsAI';
import classes from './PlayerNames.module.css';
import FreeMode from './FreeMode';
import { writeUserData, readUserData } from '../firebase';

const PlayerNames = ({setIsLoading , setMessage, setFullScreenMessage}) => {
  const { mode } = useParams();
  const [showGame, setShowGame] = useState('');
  const [previousNames, setPreviousNames] = useState([]);

  const [names, setNames] = useState({
    player1: '',
    player2: ''
  });

  useEffect(() => {
    readUserData(setPreviousNames);
  }, []);

  const findUsername = (username) => {
    return Object.keys(previousNames).find(name => username === name);
  };

  const handleNameChange = ({target}) => {
    if(target.id === 'player1') {
      setNames(prev => {
        return {...prev, player1: target.value};
      });
    };

    if(target.id === 'player2') {
      setNames(prev => {
        return {...prev, player2: target.value};
      });
    }
  }

  const startGameHandler = ({target}) => {
    if(target.id === 'players') {
      if(names.player1 === '' || names.player2 === '') {
        setMessage(`Names can't be empty!`);
        return;
      }

      if(names.player1 === names.player2) {
        setMessage(`Names can't be the same!`);
        return;
      }

      if(names.player1.length < 3 || names.player2.length < 3) {
        setMessage(`Names should be at least 3 characters long`);
        return;
      }

      if(findUsername(names.player1)){
        setMessage(`name ${names.player1} is already taken!`);
        return;
      }
      
      if(findUsername(names.player2)){
        setMessage(`name ${names.player2} is already taken!`);
        return;
      }

      writeUserData(names.player1);
      writeUserData(names.player2);
      setShowGame('2players');
      setFullScreenMessage('Game Started!');
      setTimeout(() => {
        setFullScreenMessage(`${names.player1}'s Turn!`);
      }, 2100);
      return;
    };

    if(target.id === 'ai') {
      if(names.player1 === '') {
        setMessage(`Your Name can't be empty!`);
        return;
      }

      if(names.player1.length < 3) {
        setMessage(`Your Name should be at least 3 characters long`);
        return;
      }

      if(findUsername(names.player1)){
        setMessage(`name ${names.player1} is already taken!`);
        return;
      }

      writeUserData(names.player1);
      setShowGame('ai');
      setFullScreenMessage('Game Started!');
      setTimeout(() => {
        setFullScreenMessage(`${names.player1}'s Turn!`);
      }, 2100);
      return;
    }
  };

  return (
    <div>
      {console.log(mode)}
      {mode === 'player-vs-player' && !showGame && <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player 1 Name</h3>
              <input id='player1' type="text" value={names.player1} onChange={handleNameChange} />
            </div>
            <div className={classes.group}>
              <h3>Enter Player 2 Name</h3>
              <input id='player2' type="text" value={names.player2} onChange={handleNameChange} />
            </div>
            <button id='players' onClick={startGameHandler}>Start</button>
            <h3>*Make Sure Your Opponent NOT Looking! :)</h3>
        </div>
      </div>}
      {mode === 'player-vs-ai' && !showGame && <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player Name</h3>
              <input id='player1' type="text" value={names.player1} onChange={handleNameChange} />
            </div>
            <button id='ai' onClick={startGameHandler}>Start</button>
        </div>
      </div>}
      {mode === 'free-mode' && <FreeMode setIsLoading={setIsLoading} setMessage={setMessage} setFullScreenMessage={setFullScreenMessage} />}
      {showGame === '2players' && <PlayerVsPlayer playersNames={names} setIsLoading={setIsLoading} setMessage={setMessage} setFullScreenMessage={setFullScreenMessage} />}
      {showGame === 'ai' && <PlayerVsAI playerName={names.player1} setIsLoading={setIsLoading} setMessage={setMessage} setFullScreenMessage={setFullScreenMessage} />}
      {mode !== 'player-vs-player' && mode !== 'player-vs-ai' && mode !== 'free-mode' && <Navigate to='/404' />}
    </div>
  )
}

export default PlayerNames;