import React from 'react';
import Card from './utils/Card';
import { objectsSrcName } from '../data';
import classes from './Player.module.css';

const AI = ({ai, mode}) => {
  return (
    <div className={classes.player}>
      <h2>AI</h2>
      {mode !== 'freeMode' && <div className={classes.counts}>
        <h3>Points: {ai.points}</h3>
        <h3>Rank: {ai.rank}</h3>
      </div>}
      <div className={classes.object}>
        <h4>Chosen Object:</h4>
        <div className={classes.innerObject}>
          {ai.chosenObjectId && <Card object={objectsSrcName[ai.chosenObjectId]} />}
        </div>
      </div>
    </div>
  )
}

export default AI;