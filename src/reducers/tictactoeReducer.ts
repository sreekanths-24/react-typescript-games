import type { GameAction, GameState } from "../types/tictactoe";

export function tictactoeReducer(
  state: GameState,
  action: GameAction,
): GameState {
  switch (action.type) {
    case "MAKE_MOVE": {
      // get the latest state of the board
      const newBoard = [...state.board];
      // check if the next move is a valid move, ie, if the selected
      // location in the board is not occupied or if there is a winner
      // already declared then no need to update the state so check that
      if (newBoard[action.payload] !== "" || state.winningCombinationKey) {
        return state;
      }
      //   now we make the move
      newBoard[action.payload] = state.currentPlayer;
      // then return the new state

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
      };
    }

    case "UPDATE_SCORE": {
      //   get the latest score data
      const newScore = [...state.currentScore];
      //   get the winner from the payload
      const winner = action.payload;
      // update the score
      if (winner === "X") {
        newScore[0] += 1;
      } else if (winner === "O") {
        newScore[2] += 1;
      } else {
        newScore[1] += 1;
      }
      //   return the updated state

      return {
        ...state,
        currentScore: newScore,
      };
    }
    case "SET_WINNING_COMBINATION": {
      //   just update the winningCombinationKey
      return {
        ...state,
        winningCombinationKey: action.payload,
      };
    }
    case "RESET_GAME": {
      //   reset the game state to this
      return {
        ...state,
        board: Array(9).fill(""),
        currentPlayer: "X",
        winningCombinationKey: null,
      };
    }

    case "RESET_SCORE": {
      return {
        ...state,
        board: Array(9).fill(""),
        currentPlayer: "X",
        currentScore: [0, 0, 0],
        winningCombinationKey: null,
      };
    }
    case "SET_GAME_MODE": {
      return {
        ...state,
        gameMode: action.payload,
      };
    }
    case "SET_DIFFICULTY": {
      return {
        ...state,
        difficulty: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
