function Xtoken() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="w-2/3 h-2/3 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
    >
      <line x1="18" y1="6" x2="6" y2="18" className="animate-draw-token" />
      <line x1="6" y1="6" x2="18" y2="18" className="animate-draw-token" />
    </svg>
  );
}

export default Xtoken;
