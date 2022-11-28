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