import allWinningCombinations from "../configs/allWinningCombinations";

function getEmptyPositions(board: string[]): number[] {
  return board.reduce<number[]>((positions, value, index) => {
    if (value === "") {
      positions.push(index);
    }

    return positions;
  }, []);
}

function isWinningBoard(board: string[], mark: "X" | "O"): boolean {
  return allWinningCombinations.some(([a, b, c]) => {
    return board[a] === mark && board[b] === mark && board[c] === mark;
  });
}

function getWinningMove(board: string[], mark: "X" | "O"): number | null {
  const emptyPositions = getEmptyPositions(board);

  for (const position of emptyPositions) {
    const simulatedBoard = [...board];

    simulatedBoard[position] = mark;

    if (isWinningBoard(simulatedBoard, mark)) {
      return position;
    }
  }

  return null;
}

// logic for easy mode
export function getRandomMove(board: string[]): number | null {
  const emptyPositions = getEmptyPositions(board);

  if (emptyPositions.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * emptyPositions.length);

  return emptyPositions[randomIndex];
}

export function getMediumMove(
  board: string[],
  computerMark: "X" | "O",
  playerMark: "X" | "O",
): number | null {
  const winningMove = getWinningMove(board, computerMark);

  if (winningMove !== null) {
    return winningMove;
  }

  const blockingMove = getWinningMove(board, playerMark);

  if (blockingMove !== null) {
    return blockingMove;
  }

  if (board[4] === "") {
    return 4;
  }

  return getRandomMove(board);
}

export function getAIMove(
  board: string[],
  computerMark: "X" | "O",
  playerMark: "X" | "O",
  difficulty: "easy" | "medium" | "hard",
): number | null {
  switch (difficulty) {
    case "easy":
      return getRandomMove(board);

    case "medium":
      return getMediumMove(board, computerMark, playerMark);

    case "hard":
      // Hard will be implemented later.
      return getMediumMove(board, computerMark, playerMark);

    default:
      return null;
  }
}
