// Type definition for line coordinates
import type { LineCoords } from "../types/tictactoe";


// Map each winning combination to its exact line path
const WINNING_LINE_MAP: Record<string, LineCoords> = {
  // Horizontal Rows (Row 1 is centered at 16.6%, Row 2 at 50%, Row 3 at 83.3%)
  "0,1,2": { x1: "5%", y1: "16.6%", x2: "95%", y2: "16.6%" },
  "3,4,5": { x1: "5%", y1: "50%", x2: "95%", y2: "50%" },
  "6,7,8": { x1: "5%", y1: "83.3%", x2: "95%", y2: "83.3%" },

  // Vertical Columns (Col 1 is centered at 16.6%, Col 2 at 50%, Col 3 at 83.3%)
  "0,3,6": { x1: "16.6%", y1: "5%", x2: "16.6%", y2: "95%" },
  "1,4,7": { x1: "50%", y1: "5%", x2: "50%", y2: "95%" },
  "2,5,8": { x1: "83.3%", y1: "5%", x2: "83.3%", y2: "95%" },

  // Diagonals
  "0,4,8": { x1: "5%", y1: "5%", x2: "95%", y2: "95%" }, // Top-Left to Bottom-Right
  "2,4,6": { x1: "95%", y1: "5%", x2: "5%", y2: "95%" }, // Top-Right to Bottom-Left
};

export default WINNING_LINE_MAP;
