import React, { useEffect, useReducer, useState } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVsPlayer.module.css';
import axios from 'axios';
import { playersReducer } from '../Reducers/PlayersReducer';
import { ref, update } from "firebase/database";
import { db } from '../firebase';

const PlayerVSPlayer = ({setIsLoading, setMessage, playersNames}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducer, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      points: 0,
      rank: 'Beginner',
      playerNumber: 1
    }, 
    player2: {
      isPlaying: false,
      chosenObjectId: null,
      points: 0,
      rank: 'Beginner',
      playerNumber: 2
    },
    disable: false
  });

  function updateUserData(player) {
    update(ref(db, 'users/' + player.name), {
      username: player.name,
      points: player.points,
      rank: player.rank,
    })
    .catch(error => console.log(error));
  }

  useEffect(()=>{
    updateUserData({name: playersNames.player1, points: players.player1.points, rank: players.player1.rank});
    updateUserData({name: playersNames.player2, points: players.player2.points, rank: players.player2.rank});
  }, [players,playersNames]);

  const getObjectID = (id) => {
    if(players.player1.isPlaying) {
      dispatch({type: 'PLAYER1_OBJECT_ID', id: id});
    }
    else {
      dispatch({type: 'PLAYER2_OBJECT_ID', id: id});
    }
  };

  const checkResult = () => {
    const getMatch = (url, object1, object2) => {
      setIsLoading(true);
      axios(url + `match?object_one=${object1}&object_two=${object2}`, {
        mode: 'no-cors',
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(data => {
        dispatch({type: 'RESULT', payload: data.data});
        setData(data.data);
        dispatch({type: 'DISABLE_PLAY_BUTTON'});
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
    };
    getMatch('https://rps101.pythonanywhere.com/api/v1/', players.player1.chosenObjectId, players.player2.chosenObjectId);
  };

  const resetRound = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
  };

  return ( 
    <div>
      <div className={classes.container}>
        <Player player={players.player1} dispatch={dispatch} name={playersNames.player1} setMessage={setMessage} />
        <div className={classes.content}>
          <h1 className={classes.vs}>{`${playersNames.player1} VS ${playersNames.player2}`}</h1>
          <h2>{players.player1.isPlaying ? `${playersNames.player1} Choosing...` : !players.player1.isPlaying && !players.player2.isPlaying ? 'Check Result ?' : `${playersNames.player2} Choosing...`}</h2>
          {!players.player1.isPlaying && !players.player2.isPlaying && <button disabled={players.disable} onClick={checkResult}>Check</button>}
          {!players.player1.isPlaying && !players.player2.isPlaying && <button disabled={players.disable} onClick={resetRound}>Cancel</button>}
          {data && <h2>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2>{players.player1.chosenObjectId === data.winner ? `${playersNames.player1} WON Congrats!` : `${playersNames.player2} WON Congrats!`}</h2>}
          {data && <button onClick={resetRound}>Play Again</button>}
        </div>
        <Player player={players.player2} dispatch={dispatch} name={playersNames.player2} setMessage={setMessage} />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}
 
export default PlayerVSPlayer;
