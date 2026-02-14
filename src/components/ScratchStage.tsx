import { useState } from "react";
import ScratchCard from "./ScratchCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Image1 from "@/assets/Image15.jpg";

interface ScratchStageProps {
    onComplete: () => void;
}

const ScratchStage = ({ onComplete }: ScratchStageProps) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [showFinalCTA, setShowFinalCTA] = useState(false);

    const handleReveal = () => {
        setIsRevealed(true);
        setTimeout(() => {
            setShowFinalCTA(true);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-valentine-blush flex flex-col items-center justify-center p-6 pb-20 overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className={`text-center mb-12 transition-all duration-1000 ${isRevealed ? "opacity-0 -translate-y-10 scale-90 blur-lg" : "opacity-100"}`}>
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="text-valentine-gold w-8 h-8 animate-pulse" />
                    <h2 className="text-4xl md:text-6xl font-handwriting text-primary">A Hidden Surprise...</h2>
                    <Sparkles className="text-valentine-gold w-8 h-8 animate-pulse" />
                </div>
                <p className="text-lg md:text-xl text-muted-foreground font-body max-w-md mx-auto italic">
                    There's one more layer to unlock before you see my letter. Scratch below to reveal the key to my heart... 🔑
                </p>
            </div>

            <div
                className={`bg-white p-4 rounded-2xl shadow-2xl relative transition-all duration-[2000ms] ease-in-out max-w-[90vw] z-50
                    ${isRevealed ? "scale-[1.1] md:scale-[1.3] rotate-0 shadow-[0_40px_100px_rgba(0,0,0,0.2)]" : "rotate-1 group hover:rotate-0"}
                `}
            >
                <ScratchCard
                    image={Image1}
                    width={window.innerWidth < 768 ? 300 : 500}
                    height={window.innerWidth < 768 ? 300 : 500}
                    onReveal={handleReveal}
                />

                {isRevealed && (
                    <div className="absolute -top-6 -right-6 animate-bounce">
                        <Sparkles className="w-12 h-12 text-valentine-gold fill-valentine-gold" />
                    </div>
                )}
            </div>

            {showFinalCTA && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-valentine-blush/80 backdrop-blur-md animate-in fade-in duration-1000">
                    <div className="text-center p-8">
                        <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-glow">
                            <Sparkles className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-4xl font-handwriting text-primary mb-6">Beautiful!</h3>
                        <p className="text-muted-foreground font-body mb-8 text-lg max-w-xs mx-auto">
                            Now that you've unlocked this secret, are you ready to read what's in my heart?
                        </p>
                        <button
                            onClick={onComplete}
                            className="group relative px-10 py-5 bg-primary text-white rounded-full text-2xl font-body font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
                        >
                            Open My Letter 💌
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            <div className="absolute -inset-2 bg-primary/20 rounded-full blur animate-pulse" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScratchStage;
