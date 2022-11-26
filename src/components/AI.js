import React from 'react';
import Card from './utils/Card';
import { objectsSrcName } from '../data';
import classes from './Player.module.css';

const AI = ({ai}) => {
  return (
    <div className={classes.player}>
      <h2>AI</h2>
      <div className={classes.counts}>
        <h3>Wins: {ai.wins}</h3>
        <h3>Loses: {ai.loses}</h3>
      </div>
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