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
    const [isDismissing, setIsDismissing] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if (!isActive || isDismissing) return;
        e.stopPropagation();

        if (!isFlipped) {
            setIsFlipped(true);
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
        } else {
            handleNext(e);
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        setIsDismissing(true);
        setTimeout(() => {
            onDiscard(id);
        }, 700);
    };

    return (
        <div
            className={`absolute transition-all duration-700 ease-in-out cursor-pointer
        ${isActive ? "z-50 scale-110 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : "z-10 hover:-translate-y-4"}
        ${isActive ? "w-72 h-96" : "w-48 h-64"}
        ${isDismissing ? "opacity-0 -translate-y-[1000px] rotate-[360deg] scale-50 pointer-events-none" : ""}
      `}
            style={!isActive ? style : {}}
            onClick={(e) => !isActive && !isDismissing ? onFlip(id) : handleClick(e)}
        >
            <div
                className={`relative w-full h-full text-center transition-transform duration-700 preserve-3d perspective-1000 ${isFlipped ? "rotate-y-180" : ""
                    }`}
            >
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

                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-valentine-rose to-valentine-red rounded-2xl shadow-2xl text-white overflow-hidden">
                    <Sparkles className="absolute top-4 left-4 w-6 h-6 opacity-40" />
                    <Heart className="absolute top-4 right-4 w-4 h-4 opacity-30" fill="currentColor" />

                    <div className="flex-1 flex items-center justify-center">
                        <p className="font-handwriting text-xl md:text-2xl leading-relaxed italic px-2">
                            "{quote}"
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col items-center gap-2">
                        <Heart className="w-6 h-6 fill-white animate-bounce shrink-0" />
                        {isFlipped && (
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 animate-pulse mt-2">
                                Tap anywhere to keep exploring...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroCard;
