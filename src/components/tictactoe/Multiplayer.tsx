import Box from "./Box";
import Winnerline from "./Winnerline";
import { useTicTacToe } from "../../hooks/useTicTacToe";

function Multiplayer() {
  const { state, dispatch } = useTicTacToe();

  const handleBoxClick = (index: number) => {
    dispatch({
      type: "MAKE_MOVE",
      payload: index,
    });
  };

  return (
    <div
      id="board"
      className="w-[90%] max-w-[400px] aspect-square grid grid-cols-3 grid-rows-3 gap-1 p-1 bg-gray-800 relative"
    >
      {state.board.map((value: string, index: number) => (
        <Box
          key={index}
          onClick={() => handleBoxClick(index)}
          value={value}
        />
      ))}

      {state.winningCombinationKey && (
        <Winnerline {...state.winningCombinationKey} />
      )}
    </div>
  );
}

export default Multiplayer;