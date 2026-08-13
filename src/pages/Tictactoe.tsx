import Scoreboard from "../components/tictactoe/Scoreboard";
import Multiplayer from "../components/tictactoe/Multiplayer";
import Singleplayer from "../components/tictactoe/Singleplayer";
import { useTicTacToe } from "../hooks/useTicTacToe";

function Tictactoe() {
  const { state } = useTicTacToe();

  return (
    <>
      <div
        id="main"
        className="h-dvh w-full flex justify-center items-center bg-gray-900"
      >
        { state.gameMode === "multi" ? <Multiplayer /> : <Singleplayer />}
        <Scoreboard />
      </div>
    </>
  );
}

export default Tictactoe;
