import React from 'react'
import { Link, useParams } from 'react-router-dom';
import classes from './PlayerNames.module.css';

const Inputs = () => {
  const { mode } = useParams();
  return (
    <div>
      {mode === 'player-vs-player' ? <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player 1 Name</h3>
              <input type="text" />
            </div>
            <div className={classes.group}>
              <h3>Enter Player 2 Name</h3>
              <input type="text" />
            </div>
            <Link to='/play/player'>Start</Link>
        </div>
      </div> : <div></div>}
      {mode === 'player-vs-ai' ? <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.group}>
              <h3>Enter Player Name</h3>
              <input type="text" />
            </div>
            <Link to='/play/ai'>Start</Link>
        </div>
      </div> : <div></div>}
    </div>
  )
}

export default Inputs;