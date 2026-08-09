interface WinnerlineProps { 
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

function Winnerline({ x1, y1, x2, y2}: WinnerlineProps) {
     
  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]">
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f43f5e" /* Tailwind cyan-400 */
            strokeWidth="6"
            strokeLinecap="round"
            className="animate-draw-line" /* Optional custom line draw animation class */
          />
        </svg>
  )
}

export default Winnerline