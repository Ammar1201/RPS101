import React, { useReducer, useState } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVsPlayer.module.css';
import axios from 'axios';
import { ref, update } from "firebase/database";
import { db } from '../firebase';

const playersReducer = (state, action) => {
  if(action.type === 'PLAYER1_OBJECT_ID') {
    return {
      ...state,
      player1: {
        ...state.player1,
        chosenObjectId: action.id
      }
    }
  }
  if(action.type === 'PLAYER2_OBJECT_ID') {
    return {
      ...state,
      player2: {
        ...state.player2,
        chosenObjectId: action.id
      }
    }
  }
  if(action.playerNumber === 1 && action.type === `${action.name}_DONE_PLAYING`) {
    return {
      ...state,
      player1: {
        ...state.player1,
        isPlaying: false,
      },
      player2: {
        ...state.player2,
        isPlaying: true,
      }
    }
  };
  if(action.playerNumber === 2 && action.type === `${action.name}_DONE_PLAYING`) {
    return {
      ...state,
      player2: {
        ...state.player2,
        isPlaying: false,
      }
    };
  }
  if(action.type === 'DISABLE_PLAY_BUTTON') {
    return {
      ...state,
      disable: true
    };
  }
  if(action.type === 'RESET_ROUND') {
    return {
      player1: {
        ...state.player1,
        isPlaying: true,
        chosenObjectId: null,
      },
      player2: {
        ...state.player2,
        isPlaying: false,
        chosenObjectId: null,
      },
      disable: false
    };
  }
  if(action.type === 'RESULT') {
    if(state.player1.chosenObjectId === action.payload.winner) {
      return {
        ...state,
        player1: {
          ...state.player1,
          wins: state.player1.wins + 1
        },
        player2: {
          ...state.player2,
          loses: state.player2.loses + 1
        }
      }
    }
    else {
      return {
        ...state,
        player1: {
          ...state.player1,
          loses: state.player1.loses + 1
        },
        player2: {
          ...state.player2,
          wins: state.player2.wins + 1
        }
      }
    }
  }
}

const PlayerVSPlayer = ({setIsLoading, setMessage, playersNames}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducer, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      wins: 0,
      loses: 0,
      playerNumber: 1
    }, 
    player2: {
      isPlaying: false,
      chosenObjectId: null,
      wins: 0,
      loses: 0,
      playerNumber: 2
    },
    disable: false
  });

  function updateUserData(player) {
    update(ref(db, 'users/' + player.name), {
      username: player.name,
      wins: player.wins,
      loses: player.loses,
    })
    .catch(error => console.log(error));
  }

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
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
    };
    getMatch('https://rps101.pythonanywhere.com/api/v1/', players.player1.chosenObjectId, players.player2.chosenObjectId);
    dispatch({type: 'DISABLE_PLAY_BUTTON'});
    updateUserData({name: playersNames.player1, wins: players.player1.wins, loses: players.player1.loses});
    updateUserData({name: playersNames.player2, wins: players.player2.wins, loses: players.player2.loses});
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