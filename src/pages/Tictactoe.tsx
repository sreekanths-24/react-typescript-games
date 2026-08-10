import confetti from "canvas-confetti";
import Scoreboard from "../components/tictactoe/Scoreboard";
import Box from "../components/tictactoe/Box";
import Winnerline from "../components/tictactoe/Winnerline";
import { useState, useEffect } from "react";
import WINNING_LINE_MAP from "../configs/Linecoords";

interface LineCoords {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}
function Tictactoe() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winningCombinationKey, setWinningCombinationKey] =
    useState<LineCoords | null>(null);
  const [currentScore, setCurrentScore] = useState<number[]>(() => {
    let savedScores = localStorage.getItem("scores");
    if (savedScores) {
      return JSON.parse(savedScores);
    }
    return [0, 0, 0];
  });
  const fireRealisticConfetti = () => {
    // Left side spray
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
    });
    // Right side spray
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
    });
  };

  const allWinningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const handleBoxClick = (index: number) => {
    let newBoard = [...board];
    if (newBoard[index] !== "" || winningCombinationKey) return;
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkForWin(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const updateScore = (winner: string) => {
    let newScore = [...currentScore];
    if (winner === "X") {
      newScore[0] += 1;
    } else if (winner === "O") {
      newScore[2] += 1;
    } else {
      newScore[1] += 1;
    }
    setCurrentScore(newScore);
  };

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(currentScore));
  }, [currentScore]); // Fires efficiently ONLY when the score numbers change

  const handleReset = () => {
    resetGame();
    setCurrentScore([0, 0, 0]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinningCombinationKey(null);
  };

  const checkForWin = (newBoard: string[]) => {
    for (let combination of allWinningCombinations) {
      let [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        let combinationMapKey = combination.join(",");
        setWinningCombinationKey(WINNING_LINE_MAP[combinationMapKey]);
        updateScore(currentPlayer);
        fireRealisticConfetti();

        return;
      }
    }
    const isBoardFull = !newBoard.includes("");
    if (isBoardFull) {
      updateScore("tie");
      setTimeout(resetGame, 1000);
      return;
    }

    setWinningCombinationKey(null);
  };
  
  useEffect(() => {
    if (!winningCombinationKey) return;
    const timer = setTimeout(() => {
      resetGame();
    }, 2000);
    return () => clearTimeout(timer);
  }, [winningCombinationKey]);

  return (
    <>
      <div
        id="main"
        className="h-dvh w-full flex justify-center items-center bg-gray-900"
      >
        <div
          id="board"
          className="w-[90%] max-w-[400px] aspect-square grid grid-cols-3 grid-rows-3 gap-1 p-1 bg-gray-800 relative"
        >
          {board.map((value: string, index: number) => (
            <Box
              key={index}
              onClick={() => handleBoxClick(index)}
              value={value}
            />
          ))}
          {winningCombinationKey && <Winnerline {...winningCombinationKey} />}
        </div>
        <Scoreboard currentScore={currentScore} handleReset={handleReset} />
      </div>
    </>
  );
}

export default Tictactoe;
