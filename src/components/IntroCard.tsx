import { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, X } from "lucide-react";

interface IntroCardProps {
    id: number;
    quote: string;
    onFlip: (id: number) => void;
    onDiscard: (id: number) => void;
    isActive: boolean;
    isRevealed: boolean;
    index: number;
    totalCards: number;
    style?: React.CSSProperties;
}

const IntroCard = ({
    id,
    quote,
    onFlip,
    onDiscard,
    isActive,
    isRevealed,
    index,
    totalCards,
    style
}: IntroCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (e: React.MouseEvent) => {
        if (!isActive) return; // Don't stop propagation if we're not active, let the parent handle the 'pick'
        e.stopPropagation();
        if (isFlipped) return;
        setIsFlipped(true);
        // We don't need to call onFlip(id) again here since it's already active

        // Create "bubbles" + confetti effect
        const scalar = 2;
        const bubble = confetti.shapeFromText({ text: '🫧', scalar });
        const heart = confetti.shapeFromText({ text: '❤️', scalar });

        confetti({
            shapes: [bubble, heart, 'circle'],
            particleCount: 80,
            spread: 70,
            origin: { y: 0.5 },
            colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
        });
    };

    return (
        <div
            className={`absolute transition-all duration-700 ease-in-out cursor-pointer
        ${isActive ? "z-50 scale-110 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : "z-10 hover:-translate-y-4"}
        ${isActive ? "w-72 h-96" : "w-48 h-64"}
      `}
            style={!isActive ? style : {}}
            onClick={(e) => !isActive && onFlip(id)}
        >
            <div
                className={`relative w-full h-full text-center transition-transform duration-700 preserve-3d perspective-1000 ${isFlipped ? "rotate-y-180" : ""
                    }`}
                onClick={handleFlip}
            >
                {/* Front of Card (The Back side visually in terms of card games) */}
                <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-xl border-4 border-valentine-cream group-hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-valentine-blush rounded-full flex items-center justify-center mb-3">
                        <Heart className={`w-6 h-6 text-primary ${!isActive ? "animate-pulse" : ""}`} fill="currentColor" />
                    </div>
                    <p className="text-primary font-bold text-sm mb-1">Pick me... 💌</p>
                    {!isActive && (
                        <div className="absolute top-2 right-2">
                            <Sparkles className="w-4 h-4 text-valentine-gold opacity-50" />
                        </div>
                    )}
                </div>

                {/* Back of Card (The Secret content) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-valentine-rose to-valentine-red rounded-2xl shadow-2xl text-white">
                    <Sparkles className="absolute top-4 left-4 w-6 h-6 opacity-40" />
                    <Heart className="absolute top-4 right-4 w-4 h-4 opacity-30" fill="currentColor" />

                    <p className="font-handwriting text-xl md:text-2xl leading-relaxed italic px-2">
                        "{quote}"
                    </p>

                    <div className="mt-6 flex flex-col items-center gap-2">
                        <Heart className="w-6 h-6 fill-white animate-bounce" />
                        {isFlipped && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDiscard(id);
                                }}
                                className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                            >
                                Next Secret <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroCard;
