import { useReducer, useState, useEffect } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVsPlayer.module.css';
import { getMatchResultReq } from '../api';
import { playersReducerAI } from '../Reducers/PlayersReducer';
import AI from './AI';
import { updateUserData } from '../firebase';


const PlayerVSPlayer = ({setIsLoading, setMessage, playerName, setFullScreenMessage}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducerAI, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      points: 0,
      rank: 'Not Ranked!',
      ai: true
    }, 
    ai: {
      isPlaying: false,
      chosenObjectId: null,
      points: 0,
      rank: 'Not Ranked!',
    }
  });

  useEffect(()=>{
    updateUserData({name: playerName, points: players.player1.points, rank: players.player1.rank});
  }, [players, playerName]);

  const getObjectID = (id) => {
    if(players.player1.isPlaying) {
      dispatch({type: 'PLAYER1_OBJECT_ID', id: id});
    }
  };

  const checkResultHandler = (object) => {
    getMatchResultReq(players.player1.chosenObjectId, object, dispatch, setData, setIsLoading);
  };

  const resetRoundHandler = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
    setFullScreenMessage(`${playerName}'s Turn!`);
  };

  return ( 
    <div>
      <div className={classes.container}>
        <Player player={players.player1} dispatch={dispatch} name={playerName} setMessage={setMessage} checkResultHandler={checkResultHandler} setFullScreenMessage={setFullScreenMessage} />
        <div className={classes.content}>
          <h1 className={classes.vs}>{`${playerName} VS AI`}</h1>
          <h2>{players.player1.isPlaying ? `${playerName}'s Turn...` : !players.player1.isPlaying && !players.ai.isPlaying ? '' : `AI's Turn...`}</h2>
          {data && <h2 className={classes.outcome}>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2 className={classes.winner}>{players.player1.chosenObjectId === data.winner ? 'You won. congrats!' : `AI won. Good Luck Next Time ${playerName}`}</h2>}
          {data && <button onClick={resetRoundHandler}>Play Again</button>}
        </div>
        <AI ai={players.ai} name='AI' dispatch={dispatch} setMessage={setMessage} />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}
 
export default PlayerVSPlayer;