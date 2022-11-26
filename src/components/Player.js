import React from 'react';
import Card from './utils/Card';
import { objectsSrcName } from '../data';
import classes from './Player.module.css';

const Player = ({player, dispatch, name, setMessage, checkResult}) => {
  const confirmChoice = () => {
    if(player.isPlaying) {
      if(player.chosenObjectId === null) {
        setMessage('Please select an object');
        return;
      }
      dispatch({type: `${name}_DONE_PLAYING`});
    }
    if(player.ai !== undefined) {
      const index = Math.floor(Math.random() * Object.keys(objectsSrcName).length);
      dispatch({type: 'AI_OBJECT_ID', id: Object.keys(objectsSrcName)[index], checkResult});
    }
  };

  return (
    <div className={classes.player}>
      <h2>{name}</h2>
      <div className={classes.counts}>
        <h3>Wins: {player.wins}</h3>
        <h3>Loses: {player.loses}</h3>
      </div>
      <div className={classes.object}>
        <h4>Chosen Object:</h4>
        {player.chosenObjectId && <Card object={objectsSrcName[player.chosenObjectId]} />}
      </div>
      <button disabled={!player.isPlaying} onClick={confirmChoice}>Confirm Choice</button>
    </div>
  )
}

export default Player;