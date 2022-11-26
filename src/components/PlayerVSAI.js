import React, { useReducer, useState } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVSPlayer.module.css';
import axios from 'axios';
import AI from './AI';

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
  if(action.type === 'AI_OBJECT_ID') {
    action.checkResult(action.id);
    return {
      ...state,
      ai: {
        ...state.ai,
        chosenObjectId: action.id,
        isPlaying: false
      }
    }
  }
  if(action.type === 'Player_DONE_PLAYING') {
    return {
      ...state,
      player1: {
        ...state.player1,
        isPlaying: false,
      },
      ai: {
        ...state.ai,
        isPlaying: true,
      }
    }
  };
  // if(action.type === 'AI_DONE_PLAYING') {
  //   return {
  //     ...state,
  //     ai: {
  //       ...state.ai,
  //       isPlaying: false,
  //     }
  //   };
  // }
  // if(action.type === 'DISABLE_PLAY_BUTTON') {
  //   return {
  //     ...state,
  //     disable: true
  //   };
  // }
  if(action.type === 'RESET_ROUND') {
    return {
      player1: {
        ...state.player1,
        isPlaying: true,
        chosenObjectId: null,
      },
      ai: {
        ...state.ai,
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
        ai: {
          ...state.ai,
          loses: state.ai.loses + 1
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
        ai: {
          ...state.ai,
          wins: state.ai.wins + 1
        }
      }
    }
  }
}

const PlayerVSPlayer = ({setIsLoading, setMessage}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducer, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      wins: 0,
      loses: 0,
      ai: true
    }, 
    ai: {
      isPlaying: false,
      chosenObjectId: null,
      wins: 0,
      loses: 0
    },
    disable: false
  });

  const getObjectID = (id) => {
    if(players.player1.isPlaying) {
      dispatch({type: 'PLAYER1_OBJECT_ID', id: id});
    }
  };

  const checkResult = (object2) => {
    const getMatch = (url, object1) => {
      setIsLoading(true);
      axios.get(url + `/match?object_one=${object1}&object_two=${object2}`)
        .then(data => {
          dispatch({type: 'RESULT', payload: data.data});
          console.log(data.data);
          setData(data.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    getMatch('https://rps101.pythonanywhere.com/api/v1', players.player1.chosenObjectId);
    // dispatch({type: 'DISABLE_PLAY_BUTTON'});
  };

  const resetRound = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
  };

  return ( 
    <div>
      <div className={classes.container}>
        <Player player={players.player1} dispatch={dispatch} name='Player' setMessage={setMessage} checkResult={checkResult} />
        <div className={classes.content}>
          <h1 className={classes.vs}>Player VS AI</h1>
          <h2>{players.player1.isPlaying ? 'Player Choosing...' : !players.player1.isPlaying && !players.ai.isPlaying ? '' : 'AI Choosing...'}</h2>
          {data && <h2>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2>{players.player1.chosenObjectId === data.winner ? 'Player won. congrats!' : 'AI won. good luck next time Player'}</h2>}
          {data && <button onClick={resetRound}>Play Again</button>}
        </div>
        <AI ai={players.ai} name='AI' dispatch={dispatch} setMessage={setMessage} />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}
 
export default PlayerVSPlayer;