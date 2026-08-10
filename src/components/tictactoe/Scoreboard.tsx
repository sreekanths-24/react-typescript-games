import { useState } from "react";

interface BoxProps {
  currentScore: number[];
  handleReset: () => void;
}

function Scoreboard({ currentScore, handleReset }: BoxProps) {
  // 1. Define states for modal visibility, game mode, and difficulty tracking
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<"single" | "multi">("multi"); // Default is multi-player
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  return (
    <div
      id="scoreboard"
      className="absolute z-10 bg-gray-800 w-9/10 md:w-1/2 h-[80px] rounded-full bottom-3.5 flex items-center justify-between px-6 shadow-2xl border border-gray-700/50"
    >
      {/* 1. X SCORE DISPLAY */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="flex items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="w-4 h-4 text-rose-500"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span className="text-xs font-semibold text-gray-400 tracking-wider">
            SCORE
          </span>
        </div>
        <span className="text-xl font-black text-white mt-0.5">
          {currentScore[0]}
        </span>
      </div>

      {/* 2. DRAWS DISPLAY */}
      <div className="flex flex-col items-center justify-center flex-1 border-x border-gray-700/40 px-2">
        <span className="text-xs font-semibold text-gray-400 tracking-wider">
          TIES
        </span>
        <span className="text-xl font-black text-amber-400 mt-0.5">
          {currentScore[1]}
        </span>
      </div>

      {/* 3. O SCORE DISPLAY */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="flex items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            className="w-4 h-4 text-emerald-400"
          >
            <circle cx="12" cy="12" r="8" />
          </svg>
          <span className="text-xs font-semibold text-gray-400 tracking-wider">
            SCORE
          </span>
        </div>
        <span className="text-xl font-black text-white mt-0.5">
          {currentScore[2]}
        </span>
      </div>

      {/* 4. ACTIONS CONTAINER */}
      <div className="flex items-center gap-3 pl-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-95 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md shadow-rose-950/30"
        >
          Reset
        </button>

        {/* Settings Button updates state to display overlay */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full active:scale-90 transition-all cursor-pointer"
          aria-label="Settings"
        >
          <svg
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      {/* ==========================================================================
         SETTINGS MODAL POPUP DIALOG
         ========================================================================== */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-gray-800 border border-gray-700 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-white">
            
            {/* Header section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold tracking-wide">Match Configurations</h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-white text-sm bg-gray-700/40 p-1.5 rounded-full px-3 transition-all"
              >
                Done
              </button>
            </div>

            {/* Game Mode Picker Row */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Game Setup</label>
              <div className="grid grid-cols-2 gap-2 bg-gray-900 p-1 rounded-xl">
                <button
                  onClick={() => setGameMode("multi")}
                  className={`py-2 text-sm font-medium rounded-lg transition-all ${
                    gameMode === "multi" 
                      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Multiplayer
                </button>
                <button
                  onClick={() => setGameMode("single")}
                  className={`py-2 text-sm font-medium rounded-lg transition-all ${
                    gameMode === "single" 
                      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Single Player
                </button>
              </div>
            </div>

            {/* Difficulty Submenu - Renders conditionally if single player is checked */}
            {gameMode === "single" && (
              <div className="space-y-2 mb-2 transition-all duration-300">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">AI Difficulty</label>
                <div className="grid grid-cols-3 gap-2 bg-gray-900 p-1 rounded-xl">
                  {(["easy", "medium", "hard"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg capitalize transition-all ${
                        difficulty === level
                          ? "bg-gray-700 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default Scoreboard;
