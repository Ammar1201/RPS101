import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerVsPlayer from './PlayerVsPlayer';
import PlayerVsAI from './PlayerVsAI';
import classes from './PlayerNames.module.css';

const PlayerNames = ({setIsLoading , setMessage}) => {
  const { mode } = useParams();
  const [showGame, setShowGame] = useState('');
  const [names, setNames] = useState({
    player1: '',
    player2: ''
  });

  return (
    <div>
      {mode === 'player-vs-player' && !showGame && <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player 1 Name</h3>
              <input type="text" value={names.player1} onChange={({target}) => setNames(prev => {
                return {...prev, player1: target.value };
              })} />
            </div>
            <div className={classes.group}>
              <h3>Enter Player 2 Name</h3>
              <input type="text" value={names.player2} onChange={({target}) => setNames(prev => {
                return {...prev, player2: target.value };
              })} />
            </div>
            <button onClick={() => setShowGame('2players')}>Start</button>
            <h3>*Make Sure Your Opponent NOT Looking! :)</h3>
        </div>
      </div>}
      {mode === 'player-vs-ai' && !showGame && <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player Name</h3>
              <input type="text" value={names.player1} onChange={({target}) => setNames(prev => {
                return {...prev, player1: target.value };
              })} />
            </div>
            <button onClick={() => setShowGame('ai')}>Start</button>
        </div>
      </div>}
      {showGame === '2players' && <PlayerVsPlayer setIsLoading={setIsLoading} setMessage={setMessage} playersNames={names} />}
      {showGame === 'ai' && <PlayerVsAI setIsLoading={setIsLoading} setMessage={setMessage} playerName={names.player1} />}
    </div>
  )
}

export default PlayerNames;