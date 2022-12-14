import { useReducer, useState, useEffect } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVsPlayer.module.css';
import { playersReducerFreeMode } from '../Reducers/PlayersReducer';
import { getMatchResultReq } from '../api';
import AI from './AI';


const FreeMode = ({setIsLoading, setFullScreenMessage, setMessage}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducerFreeMode, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      ai: true
    },
    ai: {
      isPlaying: false,
      chosenObjectId: null,
    }
  });

  useEffect(() => {
    setFullScreenMessage('Game Started!');
    setTimeout(() => {
      setFullScreenMessage(`Player's Turn!`);
    }, 2100);
  }, [setFullScreenMessage]);

  const getObjectID = (id) => {
    if(players.player1.isPlaying) {
      dispatch({type: 'PLAYER_OBJECT_ID', id: id});
    }
  };

  const checkResultHandler = (object) => {
    getMatchResultReq(players.player1.chosenObjectId, object, dispatch, setData, setIsLoading);
  };

  const resetRound = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
    setFullScreenMessage(`Player's Turn!`);
  };

  return ( 
    <div className={classes.mobile}>
      <div className={classes.container}>
        <Player player={players.player1} name='PLAYER' dispatch={dispatch} setMessage={setMessage} setFullScreenMessage={setFullScreenMessage} checkResultHandler={checkResultHandler} mode='freeMode' />
        <div className={classes.content}>
          <h1 className={classes.vs}>Player VS AI</h1>
          <h2>{players.player1.isPlaying ? `PLAYER's Turn...` : !players.player1.isPlaying && !players.ai.isPlaying ? '' : `AI's Turn...`}</h2>
          {data && <h2 className={classes.outcome}>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2 className={classes.winner}>{players.player1.chosenObjectId === data.winner ? 'You won. congrats!' : `AI won. Good Luck Next Time!`}</h2>}
          {data && <button onClick={resetRound}>Play Again</button>}
        </div>
        <AI ai={players.ai} mode='freeMode' />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}

export default FreeMode;