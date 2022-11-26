import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './PlayerNames.module.css';

const PlayerNames = () => {
  const { mode } = useParams();
  const [names, setNames] = useState({
    player1: '',
    player2: ''
  });

  return (
    <div>
      {mode === 'player-vs-player' ? <div className={classes.container}>
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
            <Link to='/play/player' >Start</Link>
            <h3>*Make Sure Your Opponent NOT Looking! :)</h3>
        </div>
      </div> : <div></div>}
      {mode === 'player-vs-ai' ? <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player Name</h3>
              <input type="text" value={names.player1} onChange={({target}) => setNames(prev => {
                return {...prev, player1: target.value };
              })} />
            </div>
            <Link to='/play/ai' >Start</Link>
        </div>
      </div> : <div></div>}
    </div>
  )
}

export default PlayerNames;