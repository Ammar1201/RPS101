import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayerVsPlayer from './PlayerVsPlayer';
import PlayerVsAI from './PlayerVsAI';
import classes from './PlayerNames.module.css';
import FreeMode from './FreeMode';
import { ref, set, onValue } from "firebase/database";
import { db } from '../firebase';

const PlayerNames = ({setIsLoading , setMessage}) => {
  const { mode } = useParams();
  const [showGame, setShowGame] = useState('');
  const [previousNames, setPreviousNames] = useState([]);

  const [names, setNames] = useState({
    player1: '',
    player2: ''
  });

  useEffect(() => {
    const readUserData = () => {
      onValue(ref(db, 'users/'), (snapshot) => {
        const data = snapshot.val();
        setPreviousNames(data);
      })
    };
    readUserData();
  }, []);

  const findUsername = (username) => {
    return Object.keys(previousNames).find(name => username === name);
  };

  const writeUserData = (name) => {
    set(ref(db, 'users/' + name), {
      username: name,
      points: 0,
      rank: 'Beginner',
    })
    .catch(error => console.log(error));
  }

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

  const handleClick = ({target}) => {
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
      return;
    }
  };

  return (
    <div>
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
            <button id='players' onClick={handleClick}>Start</button>
            <h3>*Make Sure Your Opponent NOT Looking! :)</h3>
        </div>
      </div>}
      {mode === 'player-vs-ai' && !showGame && <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player Name</h3>
              <input id='player1' type="text" value={names.player1} onChange={handleNameChange} />
            </div>
            <button id='ai' onClick={handleClick}>Start</button>
        </div>
      </div>}
      {mode === 'freeMode' && <FreeMode setIsLoading={setIsLoading} setMessage={setMessage} />}
      {showGame === '2players' && <PlayerVsPlayer setIsLoading={setIsLoading} setMessage={setMessage} playersNames={names} />}
      {showGame === 'ai' && <PlayerVsAI setIsLoading={setIsLoading} setMessage={setMessage} playerName={names.player1} />}
    </div>
  )
}

export default PlayerNames;