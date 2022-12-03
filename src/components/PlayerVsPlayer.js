import { useEffect, useReducer, useState } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVsPlayer.module.css';
import { getMatchResultReq } from '../api';
import { playersReducer } from '../Reducers/PlayersReducer';
import { updateUserData } from '../firebase';

const PlayerVSPlayer = ({setIsLoading, setMessage, playersNames, setFullScreenMessage}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducer, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      points: 0,
      rank: 'Not Ranked!',
      playerNumber: 1
    }, 
    player2: {
      isPlaying: false,
      chosenObjectId: null,
      points: 0,
      rank: 'Not Ranked!',
      playerNumber: 2
    },
    disable: false
  });

  useEffect(()=>{
    updateUserData({name: playersNames.player1, points: players.player1.points, rank: players.player1.rank});
    updateUserData({name: playersNames.player2, points: players.player2.points, rank: players.player2.rank});
  }, [players, playersNames]);

  const getObjectID = (id) => {
    if(players.player1.isPlaying) {
      dispatch({type: 'PLAYER1_OBJECT_ID', id: id});
    }
    else {
      dispatch({type: 'PLAYER2_OBJECT_ID', id: id});
    }
  };

  const checkResultHandler = () => {
    getMatchResultReq(players.player1.chosenObjectId, players.player2.chosenObjectId, dispatch, setData, setIsLoading);
    dispatch({type: 'DISABLE_PLAY_BUTTON'});
    setFullScreenMessage('The Winner Is ...');
  };

  const resetRoundHandler = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
    setFullScreenMessage(`${playersNames.player1}'s Turn!`);
  };

  return ( 
    <div>
      <div className={classes.container}>
        <Player player={players.player1} dispatch={dispatch} name={playersNames.player1} names={playersNames} setMessage={setMessage} setFullScreenMessage={setFullScreenMessage} />
        <div className={classes.content}>
          <h1 className={classes.vs}>{`${playersNames.player1} VS ${playersNames.player2}`}</h1>
          <h2>{players.player1.isPlaying ? `${playersNames.player1}'s Turn...` : !players.player1.isPlaying && !players.player2.isPlaying ? 'Check Result ?' : `${playersNames.player2}'s Turn...`}</h2>
          {!players.player1.isPlaying && !players.player2.isPlaying && <button disabled={players.disable} onClick={checkResultHandler}>Check</button>}
          {!players.player1.isPlaying && !players.player2.isPlaying && <button disabled={players.disable} onClick={resetRoundHandler}>Cancel</button>}
          {data && <h2 className={classes.outcome}>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2 className={classes.winner}>{players.player1.chosenObjectId === data.winner ? `${playersNames.player1} WON Congrats!` : `${playersNames.player2} WON Congrats!`}</h2>}
          {data && <button onClick={resetRoundHandler}>Play Again</button>}
        </div>
        <Player player={players.player2} dispatch={dispatch} name={playersNames.player2} names={playersNames} setMessage={setMessage} setFullScreenMessage={setFullScreenMessage} />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}
 
export default PlayerVSPlayer;