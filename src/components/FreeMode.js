import React, { useReducer, useState } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import Player from './Player';
import classes from './PlayerVSPlayer.module.css';
import axios from 'axios';
import AI from './AI';

const playersReducer = (state, action) => {
  if(action.type === 'PLAYER_OBJECT_ID') {
    return {
      ...state,
      player1: {
        ...state.player1,
        chosenObjectId: action.id
      }
    }
  }
  if(action.type === 'AI_OBJECT_ID') {
    return {
      ...state,
      ai: {
        ...state.ai,
        chosenObjectId: action.id,
        isPlaying: false
      }
    }
  }
  if(action.type === `PLAYER_DONE_PLAYING`) {
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
}

const FreeMode = ({setIsLoading, setMessage}) => {
  const [data , setData] = useState(null);

  const [players, dispatch] = useReducer(playersReducer, {
    player1: {
      isPlaying: true,
      chosenObjectId: null,
      ai: true
    }, 
    ai: {
      isPlaying: false,
      chosenObjectId: null,
    },
  });

  const getObjectID = (id) => {
    if(players.player1.isPlaying) {
      dispatch({type: 'PLAYER_OBJECT_ID', id: id});
    }
  };

  const checkResult = (object2) => {
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
          setData(data.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    getMatch('https://rps101.pythonanywhere.com/api/v1', players.player1.chosenObjectId);
  };

  const resetRound = () => {
    dispatch({type: 'RESET_ROUND'});
    setData(null);
  };

  return ( 
    <div>
      <div className={classes.container}>
        <Player player={players.player1} dispatch={dispatch} name='PLAYER' setMessage={setMessage} checkResult={checkResult} mode='freeMode' />
        <div className={classes.content}>
          <h1 className={classes.vs}>Player VS AI</h1>
          <h2>{players.player1.isPlaying ? `PLAYER Choosing...` : !players.player1.isPlaying && !players.ai.isPlaying ? '' : 'AI Choosing...'}</h2>
          {data && <h2>{`${data.winner} ${data.outcome} ${data.loser}`}</h2>}
          {data && <h2>{players.player1.chosenObjectId === data.winner ? 'You won. congrats!' : `AI won. Good Luck Next Time!`}</h2>}
          {data && <button onClick={resetRound}>Play Again</button>}
        </div>
        <AI ai={players.ai} name='AI' dispatch={dispatch} setMessage={setMessage} mode='freeMode' />
      </div>
      <ObjectsMap getObjectID={getObjectID} />
    </div> 
  );
}

export default FreeMode;