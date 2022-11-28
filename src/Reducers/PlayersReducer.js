const checkRank = (points) => {
  // switch(points) {
  //   case points => 0 && points <= 250:
  //     return 'Beginner';
  //   case points > 250 && points <= 500:
  //     return 'Intermediate';
  //   case points > 500 && points <= 750:
  //     return 'Advanced';
  //   default:
  //     return 'Looser :)';
  // }
  
  // if(points < 0){
  //   console.log(points, 'No Rank!');
  //   return 'No Rank!';
  // }
  
  // if(points <= 50){
  //   console.log(points, 'Beginner');
  //   return 'Beginner';
  // }
  
  // if(points <= 100 && points > 51){
  //   console.log(points, 'Intermediate');
  //   return 'Intermediate';
  // }

  // if(points <= 150 && points > 101){
  //   console.log(points, 'Advanced');
  //   return 'Advanced';
  // }

  // return 'Master!';

  if(points < 0){
    return 'No Rank!';
  }
  
  if(points <= 250){
    return 'Beginner';
  }
  
  if(points > 250 && points <= 500){
    return 'Intermediate';
  }

  if(points > 500 && points <= 750){
    return 'Advanced';
  }

  if(points > 750 && points <= 1000){
    return 'Master!';
  }

  const ranks = ['Absolute GOAT !!!!!', 'THE GOAT HIMSELF!!!', 'Master of The Masters'];
  return ranks[Math.floor(Math.random() * ranks.length)];
};

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
      const player1Rank = checkRank(state.player1.points + 50);
      const player2Rank = checkRank(state.player2.points - 50);
      return {
        ...state,
        player1: {
          ...state.player1,
          points: state.player1.points + 50,
          rank: player1Rank
        },
        player2: {
          ...state.player2,
          points: state.player2.points - 50,
          rank: player2Rank
        }
      }
    }
    else {
      const player1Rank = checkRank(state.player1.points - 50);
      const player2Rank = checkRank(state.player2.points + 50);
      return {
        ...state,
        player1: {
          ...state.player1,
          points: state.player1.points - 50,
          rank: player1Rank
        },
        player2: {
          ...state.player2,
          points: state.player2.points + 50,
          rank: player2Rank
        }
      }
    }
  }
}

// ---------------------------- AI 

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
          points: state.player1.points + 50
        },
        ai: {
          ...state.ai,
          points: state.ai.points - 50
        }
      }
    }
    else {
      return {
        ...state,
        player1: {
          ...state.player1,
          points: state.player1.points - 50
        },
        ai: {
          ...state.ai,
          points: state.ai.points + 50
        }
      }
    }
  }
}

// ---------------------------- Free Mode
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