import { useState, useEffect } from "react";
import IntroCard from "./IntroCard";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import TypewriterText from "./TypewriterText";

const QUOTES = [
    "In your smile, I see something more beautiful than the stars.",
    "You are the piece of me I didn't know was missing.",
    "My heart is, and always will be, yours.",
    "Loving you is the best thing I've ever done.",
];

interface IntroSequenceProps {
    onComplete: () => void;
    recipientName: string;
}

const IntroSequence = ({ onComplete, recipientName }: IntroSequenceProps) => {
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [discardedIds, setDiscardedIds] = useState<number[]>([]);
    const [showFinale, setShowFinale] = useState(false);

    const remainingQuotes = QUOTES.map((quote, id) => ({ id, quote }))
        .filter(q => !discardedIds.includes(q.id));

    const handlePick = (id: number) => {
        setActiveCardId(id);
    };

    const handleDiscard = (id: number) => {
        setDiscardedIds(prev => [...prev, id]);
        setActiveCardId(null);
    };

    useEffect(() => {
        if (discardedIds.length === QUOTES.length) {
            setTimeout(() => setShowFinale(true), 800);
        }
    }, [discardedIds]);

    // Calculate fan position for a card at index i out of total remaining
    const getFanStyle = (i: number, total: number): React.CSSProperties => {
        const center = (total - 1) / 2;
        const diff = i - center;
        const angle = diff * 12; // Rotate based on position
        const xOffset = diff * 50; // Spread horizontally
        const yOffset = Math.abs(diff) * 15; // Arc effect

        return {
            left: `calc(50% + ${xOffset}px)`,
            bottom: `calc(20% - ${yOffset}px)`,
            transform: `translateX(-50%) rotate(${angle}deg)`,
        };
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-start p-6 bg-valentine-blush overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className={`mt-12 text-center transition-all duration-1000 ${activeCardId !== null ? "opacity-20 scale-95 blur-sm" : "opacity-100"}`}>
                <h1 className="text-4xl md:text-6xl text-primary font-handwriting mb-4">
                    <TypewriterText text={`Hello, ${recipientName}...`} delay={500} speed={100} />
                </h1>
                <div className="text-lg md:text-xl text-muted-foreground font-body max-w-md mx-auto h-20">
                    <TypewriterText
                        text={discardedIds.length === 0
                            ? "I've fanned out some secrets for you. Pick a card, any card... ✨"
                            : "Keep exploring the secrets in my hand... 💌"
                        }
                        delay={2500}
                        speed={40}
                    />
                </div>
            </div>

            {/* The Fan Container */}
            <div className="absolute inset-0 pointer-events-none">
                {remainingQuotes.map((q, i) => (
                    <div key={q.id} className="pointer-events-auto">
                        <IntroCard
                            id={q.id}
                            quote={q.quote}
                            isActive={activeCardId === q.id}
                            isRevealed={discardedIds.includes(q.id)}
                            onFlip={handlePick}
                            onDiscard={handleDiscard}
                            index={i}
                            totalCards={remainingQuotes.length}
                            style={getFanStyle(i, remainingQuotes.length)}
                        />
                    </div>
                ))}
            </div>

            {/* Overlay when a card is selected */}
            {activeCardId !== null && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 animate-in fade-in"
                    onClick={() => { }} // Block clicks to background
                />
            )}

            {/* Finale Transition */}
            {showFinale && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-valentine-blush animate-in fade-in duration-1000">
                    <div className="text-center p-8 max-w-lg">
                        <div className="mb-6 flex justify-center">
                            <div className="relative">
                                <Sparkles className="w-16 h-16 text-valentine-gold animate-spin-slow" />
                                <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary shadow-glow" fill="currentColor" />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-handwriting text-primary mb-6">
                            You've found them all!
                        </h2>
                        <p className="text-muted-foreground font-body mb-8 text-lg">
                            But these were just small whispers... are you ready for my real surprise?
                        </p>
                        <button
                            onClick={onComplete}
                            className="group relative px-10 py-5 bg-primary text-white rounded-full text-2xl font-body font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
                        >
                            Open My Heart 💌
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            <div className="absolute -inset-2 bg-primary/20 rounded-full blur animate-pulse" />
                        </button>
                    </div>
                </div>
            )}

            {/* Progress Counter */}
            {discardedIds.length < QUOTES.length && activeCardId === null && (
                <div className="absolute bottom-10 flex gap-3 animate-in fade-in slide-in-from-bottom-5 delay-500">
                    {QUOTES.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all duration-500 border border-primary/20 ${i < discardedIds.length ? "bg-primary scale-110 shadow-glow" : "bg-white"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default IntroSequence;
