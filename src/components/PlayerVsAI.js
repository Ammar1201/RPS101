import React, { useReducer, useState, useEffect } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVsPlayer.module.css';
import axios from 'axios';
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
      rank: 'Beginner',
      ai: true
    }, 
    ai: {
      isPlaying: false,
      chosenObjectId: null,
      points: 0,
      rank: 'Beginner'
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

  const checkResultHandler = (object2) => {
    const getMatch = (url, object1) => {
      setIsLoading(true);
      axios(url + `/match?object_one=${object1}&object_two=${object2}`,{
        mode: 'no-cors',
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(data => {
        dispatch({type: 'RESULT', payload: data.data});
        setData(data.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
    };
    getMatch('https://rps101.pythonanywhere.com/api/v1', players.player1.chosenObjectId);
  };

  const resetRoundHandler = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
    setFullScreenMessage(`${playerName}'s Turn!`);
  };

  return ( 
    <div>
      <div className={classes.container}>
        <Player player={players.player1} dispatch={dispatch} name={playerName} setMessage={setMessage} checkResultHandler={checkResultHandler} />
        <div className={classes.content}>
          <h1 className={classes.vs}>{`${playerName} VS AI`}</h1>
          <h2>{players.player1.isPlaying ? `${playerName}'s Turn...` : !players.player1.isPlaying && !players.ai.isPlaying ? '' : `AI's Turn...`}</h2>
          {data && <h2>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2>{players.player1.chosenObjectId === data.winner ? 'You won. congrats!' : `AI won. Good Luck Next Time ${playerName}`}</h2>}
          {data && <button onClick={resetRoundHandler}>Play Again</button>}
        </div>
        <AI ai={players.ai} name='AI' dispatch={dispatch} setMessage={setMessage} />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}
 
export default PlayerVSPlayer;
