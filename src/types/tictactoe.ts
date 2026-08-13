export interface LineCoords {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

export interface MultiplayerInterface {
  board: string[];
  winningCombinationKey: LineCoords | null;
  handleBoxClick: (index: number) => void;
}
export interface GameState {
  board: string[];
  currentPlayer: "X" | "O";
  currentScore: number[];
  winningCombinationKey: LineCoords | null;
  gameMode: "single" | "multi";
  difficulty: "easy" | "medium" | "hard";
  playerMark: "X" | "O" | null;
}
export type GameAction =
  | {
      type: "MAKE_MOVE";
      payload: number;
    }
  | {
      type: "UPDATE_SCORE";
      payload: "X" | "O" | "tie";
    }
  | {
      type: "SET_WINNING_COMBINATION";
      payload: LineCoords | null;
    }
  | {
      type: "RESET_GAME";
    }
  | {
      type: "RESET_SCORE";
    }
  | {
      type: "SET_GAME_MODE";
      payload: "single" | "multi";
    }
  | {
      type: "SET_DIFFICULTY";
      payload: "easy" | "medium" | "hard";
    }
  | {
      type: "SET_PLAYER_MARK";
      payload: "X" | "O";
    };

export const initialGameState: GameState = {
  board: Array(9).fill(""),
  currentPlayer: "X",
  currentScore: [0, 0, 0],
  winningCombinationKey: null,
  gameMode: "multi",
  difficulty: "medium",
  playerMark: null,
};
