import { useEffect } from "react";
import { useTicTacToe } from "../../hooks/useTicTacToe";
import { getAIMove } from "../../brain/ticTacToeAI";
import Box from "./Box";
import Winnerline from "./Winnerline";

function SinglePlayer() {
  const { state, dispatch } = useTicTacToe();

  const handlePlayerMarkSelection = (mark: "X" | "O") => {
    dispatch({
      type: "SET_PLAYER_MARK",
      payload: mark,
    });
  };

  const computerMark = state.playerMark === "X" ? "O" : "X";
  useEffect(() => {
    if (state.playerMark === null) {
      return;
    }

    if (state.currentPlayer !== computerMark) {
      return;
    }

    if (state.winningCombinationKey) {
      return;
    }

    const aiMove = getAIMove(
      state.board,
      computerMark,
      state.playerMark,
      state.difficulty,
    );

    if (aiMove === null) {
      return;
    }

    dispatch({
      type: "MAKE_MOVE",
      payload: aiMove,
    });
  }, [
    state.board,
    state.currentPlayer,
    state.playerMark,
    state.winningCombinationKey,
  ]);
  const handleBoxClick = (index: number) => {
    if (state.currentPlayer !== state.playerMark) {
      return;
    }

    dispatch({
      type: "MAKE_MOVE",
      payload: index,
    });
  };

  if (state.playerMark === null) {
    return (
      <div className="text-white flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Choose your symbol</h2>

        <div className="flex gap-4">
          <button
            onClick={() => handlePlayerMarkSelection("X")}
            className="px-6 py-3 bg-cyan-500 rounded-lg text-xl font-bold"
          >
            X
          </button>

          <button
            onClick={() => handlePlayerMarkSelection("O")}
            className="px-6 py-3 bg-emerald-500 rounded-lg text-xl font-bold"
          >
            O
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="board"
      className="w-[90%] max-w-[400px] aspect-square grid grid-cols-3 grid-rows-3 gap-1 p-1 bg-gray-800 relative"
    >
      {state.board.map((value: string, index: number) => (
        <Box key={index} onClick={() => handleBoxClick(index)} value={value} />
      ))}

      {state.winningCombinationKey && (
        <Winnerline {...state.winningCombinationKey} />
      )}
    </div>
  );
}

export default SinglePlayer;
