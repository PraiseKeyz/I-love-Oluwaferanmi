import { useState, useEffect } from "react";
import { Heart, PartyPopper, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface FinalProposalProps {
    recipientName: string;
    onAccept: () => void;
}

const FinalProposal = ({ recipientName, onAccept }: FinalProposalProps) => {
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [hasAccepted, setHasAccepted] = useState(false);
    const [noCount, setNoCount] = useState(0);

    const moveNoButton = () => {
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        setNoButtonPos({ x: newX, y: newY });
        setNoCount(prev => prev + 1);
    };

    const handleYes = () => {
        setHasAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF6B6B", "#FFD93D", "#f97316"]
        });
    };

    const noMessages = [
        "No? 😢",
        "Are you sure?",
        "Think again! 🧐",
        "Wrong button! 😂",
        "You're being silly!",
        "I'll wait... Forever.",
        "Try again! ✨",
    ];

    if (hasAccepted) {
        return (
            <div className="fixed inset-0 z-[150] bg-valentine-blush flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-1000">
                <div className="bg-white/50 backdrop-blur-md p-10 md:p-12 rounded-[50px] shadow-2xl border-4 border-primary/20 max-w-lg w-full">
                    <PartyPopper className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-6 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-handwriting text-primary mb-6">Yay! ❤️</h2>
                    <p className="text-lg md:text-2xl font-body text-muted-foreground leading-relaxed mb-8">
                        You just made me the happiest person in the world, {recipientName}!
                    </p>

                    <button
                        onClick={onAccept}
                        className="group relative px-8 py-4 bg-primary text-white rounded-full text-xl font-body font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                    >
                        See my other surprises
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-8 flex justify-center gap-4">
                        <Heart className="text-primary w-6 h-6 fill-primary animate-pulse" />
                        <Heart className="text-primary w-10 h-10 fill-primary animate-pulse delay-75" />
                        <Heart className="text-primary w-6 h-6 fill-primary animate-pulse delay-150" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[150] bg-valentine-blush flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="text-center mb-12 animate-in fade-in zoom-in slide-in-from-bottom-20 duration-[1500ms] ease-out">
                <h2 className="text-4xl md:text-7xl font-handwriting text-primary mb-12 px-4 leading-tight">
                    {recipientName}, will you be my Valentine?
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <button
                        onClick={handleYes}
                        className="group relative px-12 py-6 md:px-16 md:py-8 bg-primary text-white rounded-full text-3xl md:text-4xl font-body font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all z-20"
                    >
                        YES! ❤️
                        <div className="absolute -inset-2 bg-primary/20 rounded-full blur animate-pulse" />
                    </button>

                    <button
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton}
                        style={noCount > 0 ? {
                            position: 'fixed',
                            left: `${noButtonPos.x}px`,
                            top: `${noButtonPos.y}px`,
                            transition: 'all 0.2s ease-out'
                        } : {}}
                        className="px-8 py-4 bg-muted text-muted-foreground rounded-full text-xl font-body font-medium shadow-lg z-20"
                    >
                        {noCount === 0 ? "No" : noMessages[noCount % noMessages.length]}
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
                <Heart className="w-32 h-32 text-primary rotate-12" fill="currentColor" />
            </div>
            <div className="absolute top-10 right-10 opacity-20 hidden md:block">
                <Heart className="w-24 h-24 text-primary -rotate-12" fill="currentColor" />
            </div>
        </div>
    );
};

export default FinalProposal;
