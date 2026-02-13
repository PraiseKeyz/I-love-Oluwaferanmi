import { useState, useEffect } from "react";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    onComplete?: () => void;
    speed?: number;
}

const TypewriterText = ({ text, className = "", delay = 0, onComplete, speed = 50 }: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (displayedText.length < text.length) {
            const nextChar = text[displayedText.length];
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + nextChar);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            const completeTimeout = setTimeout(onComplete, 500);
            return () => clearTimeout(completeTimeout);
        }
    }, [displayedText, text, speed, started, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            {displayedText.length < text.length && started && (
                <span className="animate-pulse border-r-2 border-primary ml-1" />
            )}
        </span>
    );
};

export default TypewriterText;
