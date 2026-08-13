import { createContext, useReducer, useEffect, type ReactNode } from "react";
import confetti from "canvas-confetti";
import WINNING_LINE_MAP from "../configs/Linecoords";
import allWinningCombinations from "../configs/allWinningCombinations";
import type { GameAction, GameState } from "../types/tictactoe";
import { tictactoeReducer } from "../reducers/tictactoeReducer";
import { initialGameState } from "../types/tictactoe";

interface TicTacToeContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const TicTacToeContext = createContext<TicTacToeContextType | null>(
  null,
);

interface TicTacToeProviderProps {
  children: ReactNode;
}

export function TicTacToeProvider({ children }: TicTacToeProviderProps) {
  const initializeGame = () => {
    const savedScores = localStorage.getItem("scores");

    if (savedScores) {
      return {
        ...initialGameState,
        currentScore: JSON.parse(savedScores),
      };
    }

    return initialGameState;
  };
  const [state, dispatch] = useReducer(
    tictactoeReducer,
    initialGameState,
    initializeGame,
  );
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(state.currentScore));
  }, [state.currentScore]); // Fires efficiently ONLY when the score numbers change
  const fireRealisticConfetti = () => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
    });
  };
  const resetGame = () => {
    dispatch({
      type: "RESET_GAME",
    });
  };

  const checkForWin = () => {
    for (let combination of allWinningCombinations) {
      let [a, b, c] = combination;

      if (
        state.board[a] &&
        state.board[a] === state.board[b] &&
        state.board[a] === state.board[c]
      ) {
        const winner = state.board[a] as "X" | "O";

        let combinationMapKey = combination.join(",");

        dispatch({
          type: "SET_WINNING_COMBINATION",
          payload: WINNING_LINE_MAP[combinationMapKey],
        });

        dispatch({
          type: "UPDATE_SCORE",
          payload: winner,
        });

        fireRealisticConfetti();

        return;
      }
    }

    const isBoardFull = !state.board.includes("");

    if (isBoardFull) {
      dispatch({
        type: "UPDATE_SCORE",
        payload: "tie",
      });

      setTimeout(resetGame, 1000);

      return;
    }

    dispatch({
      type: "SET_WINNING_COMBINATION",
      payload: null,
    });
  };
  useEffect(() => {
    checkForWin();
  }, [state.board]);
  useEffect(() => {
    if (!state.winningCombinationKey) return;

    const timer = setTimeout(() => {
      resetGame();
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.winningCombinationKey]);
  return (
    <TicTacToeContext.Provider value={{ state, dispatch }}>
      {children}
    </TicTacToeContext.Provider>
  );
}
