import { useContext } from "react";
import { TicTacToeContext } from "../context/TicTacToeContext";

export function useTicTacToe() {
  const context = useContext(TicTacToeContext);

  if (!context) {
    throw new Error(
      "useTicTacToe must be used inside TicTacToeProvider"
    );
  }

  return context;
}