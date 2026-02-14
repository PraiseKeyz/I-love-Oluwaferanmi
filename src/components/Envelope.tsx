import { useState } from "react";
import confetti from "canvas-confetti";

interface EnvelopeProps {
  onOpen: () => void;
  recipientName: string;
}

const Envelope = ({ onOpen, recipientName }: EnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#e84393", "#fd79a8", "#ff6b6b", "#ee5a24", "#f8c291", "#ff9ff3"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#e84393", "#fd79a8", "#ff6b6b"],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#e84393", "#fd79a8", "#ff6b6b"],
      });
    }, 300);

    setTimeout(() => onOpen(), 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4">
      <h1 className="text-4xl md:text-6xl font-handwriting text-primary mb-2 animate-[pulse-glow_2s_ease-in-out_infinite] rounded-full px-6 py-2">
        Happy Valentine's Day
      </h1>
      <p className="text-lg md:text-xl font-body text-muted-foreground mb-10">
        {recipientName}, you have a special message 💌
      </p>

      <button
        onClick={handleClick}
        disabled={isOpening}
        className="group relative cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none"
        aria-label="Open the envelope"
      >
        <div
          className={`w-64 h-44 md:w-80 md:h-52 bg-gradient-to-br from-valentine-rose to-valentine-red rounded-lg shadow-2xl relative overflow-visible transition-all duration-500 ${isOpening ? "scale-95 opacity-80" : ""
            }`}
          style={{
            animation: !isOpening ? "pulse-glow 2s ease-in-out infinite" : "none",
          }}
        >
          <div
            className={`absolute -top-0 left-0 w-0 h-0 transition-all duration-700 ease-in-out`}
            style={{
              borderLeft: "clamp(128px, 20vw, 160px) solid transparent",
              borderRight: "clamp(128px, 20vw, 160px) solid transparent",
              borderTop: `80px solid hsl(0 78% 45%)`,
              transformOrigin: "top center",
              transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl md:text-6xl drop-shadow-lg">💌</span>
          </div>

          <div
            className={`absolute left-4 right-4 bg-valentine-cream rounded-t-md transition-all duration-700 ease-out ${isOpening ? "-top-16 opacity-100" : "top-2 opacity-0"
              }`}
            style={{ height: "60px" }}
          >
            <div className="p-3 text-center">
              <p className="font-handwriting text-primary text-sm">For you, {recipientName}...</p>
            </div>
          </div>
        </div>

        {!isOpening && (
          <p className="mt-6 text-primary font-body font-semibold text-sm md:text-base animate-bounce">
            💗 Tap to open 💗
          </p>
        )}
      </button>
    </div>
  );
};

export default Envelope;
