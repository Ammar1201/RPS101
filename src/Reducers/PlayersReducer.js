const WINNING_POINTS = 50;
const LOSING_POINTS = -20;

const checkRank = (points) => {
  if(points < 0){
    return 'No Rank!';
  }
  
  if(points < 250){
    return 'Beginner';
  }
  
  if(points >= 250 && points < 500){
    return 'Intermediate';
  }

  if(points >= 500 && points < 750){
    return 'Advanced';
  }

  if(points >= 750 && points < 1000){
    return 'Master!';
  }

  const ranks = ['Absolute GOAT !!!!!', 'THE GOAT HIMSELF!!!', 'Master of The Masters'];
  return ranks[Math.floor(Math.random() * ranks.length)];
};

//* --------------------Player Vs Player----------------------------
export const playersReducer = (state, action) => {
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
      const player1Rank = checkRank(state.player1.points + WINNING_POINTS);
      const player2Rank = checkRank(state.player2.points + LOSING_POINTS);
      return {
        ...state,
        player1: {
          ...state.player1,
          points: state.player1.points + WINNING_POINTS,
          rank: player1Rank
        },
        player2: {
          ...state.player2,
          points: state.player2.points + LOSING_POINTS,
          rank: player2Rank
        }
      }
    }
    else {
      const player1Rank = checkRank(state.player1.points + LOSING_POINTS);
      const player2Rank = checkRank(state.player2.points + WINNING_POINTS);
      return {
        ...state,
        player1: {
          ...state.player1,
          points: state.player1.points + LOSING_POINTS,
          rank: player1Rank
        },
        player2: {
          ...state.player2,
          points: state.player2.points + WINNING_POINTS,
          rank: player2Rank
        }
      }
    }
  }
}

//* ----------------------AI-------------------------------
export const playersReducerAI = (state, action) => {
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
    return {
      ...state,
      ai: {
        ...state.ai,
        chosenObjectId: action.id,
        isPlaying: false
      }
    }
  }
  if(action.type === `${action.name}_DONE_PLAYING`) {
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
  if(action.type === 'RESULT') {
    if(state.player1.chosenObjectId === action.payload.winner) {
      return {
        ...state,
        player1: {
          ...state.player1,
          points: state.player1.points + WINNING_POINTS
        },
        ai: {
          ...state.ai,
          points: state.ai.points + LOSING_POINTS
        }
      }
    }
    else {
      return {
        ...state,
        player1: {
          ...state.player1,
          points: state.player1.points + LOSING_POINTS
        },
        ai: {
          ...state.ai,
          points: state.ai.points + WINNING_POINTS
        }
      }
    }
  }
}

//* ----------------------Free Mode-------------------------------
export const playersReducerFreeMode = (state, action) => {
  if(action.type === 'PLAYER_OBJECT_ID') {
    return {
      ...state,
      player1: {
        ...state.player1,
        chosenObjectId: action.id
      }
    }
  }
  if(action.type === 'AI_DONE_PLAYING') {
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