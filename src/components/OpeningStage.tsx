import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface OpeningStageProps {
    onComplete: () => void;
    onAction: () => void;
}

const OpeningStage = ({ onComplete, onAction }: OpeningStageProps) => {
    const [isExploded, setIsExploded] = useState(false);

    const handleHeartClick = () => {
        if (isExploded) return;
        onAction();
        setIsExploded(true);

        // Big Bang Confetti
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        // Initial big burst
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
            scalar: 1.2
        });

        setTimeout(onComplete, 1200);
    };

    return (
        <div
            className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-all duration-1000 ${isExploded ? "bg-valentine-blush scale-110 opacity-0" : "bg-[#0a0a0a]"
                }`}
        >
            <div className="relative group cursor-pointer" onClick={handleHeartClick}>
                <div className="absolute -inset-8 bg-primary/20 rounded-full blur-2xl animate-pulse group-hover:bg-primary/40 transition-colors" />

                <div className="relative animate-[pulse-glow_2s_ease-in-out_infinite]">
                    <Heart
                        className="w-24 h-24 md:w-32 md:h-32 text-primary shadow-glow transition-transform hover:scale-110 active:scale-95 translate-z-0"
                        fill="currentColor"
                    />
                    <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-valentine-gold animate-bounce" />
                </div>
            </div>

            <div className="mt-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-5">
                <h2 className="text-xl md:text-2xl text-white/80 font-body uppercase tracking-[0.3em]">
                    For your eyes only
                </h2>
                <p className="text-primary mt-4 font-handwriting text-3xl animate-pulse">
                    Click to reveal the magic
                </p>
            </div>

            {/* Subtle background particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default OpeningStage;
