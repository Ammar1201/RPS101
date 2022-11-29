import React from 'react';
import Card from './utils/Card';
import { objectsSrcName } from '../data';
import classes from './Player.module.css';

const Player = ({player, dispatch, name, names, setMessage, checkResultHandler, mode, setFullScreenMessage}) => {
  const confirmChoiceHandler = () => {
    if(player.isPlaying) {
      if(player.chosenObjectId === null) {
        setMessage('Please select an object!');
        return;
      }
      if(player.playerNumber === 1) {
        setFullScreenMessage(`${names.player2}'s Turn!`);
      }
      dispatch({type: `${name}_DONE_PLAYING`, playerNumber: player.playerNumber, name});
    }
    if(player.ai !== undefined) {
      const index = Math.floor(Math.random() * Object.keys(objectsSrcName).length);
      dispatch({type: 'AI_DONE_PLAYING', id: Object.keys(objectsSrcName)[index]});
      checkResultHandler(Object.keys(objectsSrcName)[index]);
      setFullScreenMessage('The Winner Is ...');
    }
  };

  return (
    <div className={classes.player}>
      <h2>{name}</h2>
      {mode !== 'freeMode' && <div className={classes.counts}>
        <h3>Points: {player.points}</h3>
        <h3>Rank: {player.rank}</h3>
      </div>}
      <div className={classes.object}>
        <h4>Chosen Object:</h4>
        <div className={classes.innerObject}>
          {player.chosenObjectId && <Card object={objectsSrcName[player.chosenObjectId]} />}
        </div>
      </div>
      <button disabled={!player.isPlaying} onClick={confirmChoiceHandler}>Confirm Choice</button>
    </div>
  )
}

export default Player;