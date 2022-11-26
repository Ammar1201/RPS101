import React, { useReducer, useState } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import { objectsSrcName } from '../data';
import Player from './Player';
import classes from './PlayerVSPlayer.module.css';
import axios from 'axios';

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
  if(action.type === 'Player 1_DONE_PLAYING') {
    return {
      ...state,
      player1: {
        ...state.player1,
        isPlaying: false,
        chosenObjectName: objectsSrcName[state.player1.chosenObjectId].name
      },
      player2: {
        ...state.player2,
        isPlaying: true,
      }
    }
  };
  if(action.type === 'Player 2_DONE_PLAYING') {
    return {
      ...state,
      player2: {
        ...state.player2,
        isPlaying: false,
        chosenObjectName: objectsSrcName[state.player2.chosenObjectId].name
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
        chosenObjectName: null,
      },
      player2: {
        ...state.player2,
        isPlaying: false,
        chosenObjectId: null,
        chosenObjectName: null,
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

const PlayerVSPlayer = ({setIsLoading, setMessage}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducer, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      chosenObjectName: null,
      wins: 0,
      loses: 0
    }, 
    player2: {
      isPlaying: false,
      chosenObjectId: null,
      chosenObjectName: null,
      wins: 0,
      loses: 0
    },
    disable: false
  });

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
      axios.get(url + `/match?object_one=${object1}&object_two=${object2}`)
        .then(data => {
          dispatch({type: 'RESULT', payload: data.data});
          setData(data.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    getMatch('https://rps101.pythonanywhere.com/api/v1', players.player1.chosenObjectName, players.player2.chosenObjectName);
    dispatch({type: 'DISABLE_PLAY_BUTTON'});
  };

  const resetRound = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
  };

  return ( 
    <div>
      <div className={classes.container}>
        {console.log(players)}
        <Player player={players.player1} dispatch={dispatch} name='Player 1' setMessage={setMessage} />
        <div className={classes.content}>
          <h1 className={classes.vs}>Player1 VS Player2</h1>
          <h2>{players.player1.isPlaying ? 'Player1 Choosing...' : !players.player1.isPlaying && !players.player2.isPlaying ? 'Check Result ?' : 'Player2 Choosing...'}</h2>
          {!players.player1.isPlaying && !players.player2.isPlaying && <button disabled={players.disable} onClick={checkResult}>Play</button>}
          {data && <h2>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2>{players.player1.chosenObjectId === data.winner ? 'player 1 won. good luck next time player 2' : 'player 2 won. good luck next time player 1'}</h2>}
          {data && <button onClick={resetRound}>Play Again</button>}
        </div>
        <Player player={players.player2} dispatch={dispatch} name='Player 2' setMessage={setMessage} />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}
 
export default PlayerVSPlayer;