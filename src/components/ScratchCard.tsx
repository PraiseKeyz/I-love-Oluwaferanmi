import React, { useRef, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface ScratchCardProps {
    image: string;
    onComplete?: () => void;
    onReveal?: () => void;
    width?: number;
    height?: number;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
    image,
    onComplete,
    onReveal,
    width = 300,
    height = 300,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratching, setIsScratching] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Fill with silver-ish scratch material
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#d1d5db"); // gray-300
        gradient.addColorStop(0.5, "#9ca3af"); // gray-400
        gradient.addColorStop(1, "#d1d5db");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);


        ctx.strokeStyle = "#4b5563"; // gray-600
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }

        // Add "Scratch Me" text
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px 'Quicksand', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SCRATCH ME ✨", width / 2, height / 2);
    }, [width, height]);

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };

    const scratch = (x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        checkRevealPercentage();
    };

    const checkRevealPercentage = () => {
        if (isRevealed) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] < 128) {
                transparentPixels++;
            }
        }

        const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;

        if (percentage > 50) {
            setIsRevealed(true);
            setShowHint(false);
            if (onComplete) onComplete();
            if (onReveal) onReveal();

            // Clear entire canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsScratching(true);
        setShowHint(false);
        const { x, y } = getCoordinates(e);
        scratch(x, y);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsScratching(true);
        setShowHint(false);
        const { x, y } = getCoordinates(e);
        scratch(x, y);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isScratching) return;
        const { x, y } = getCoordinates(e);
        scratch(x, y);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isScratching) return;
        const { x, y } = getCoordinates(e);
        scratch(x, y);
    };

    const handleEnd = () => {
        setIsScratching(false);
    };

    return (
        <div className="relative group overflow-hidden rounded-sm shadow-xl bg-card">
            {/* Background Image (Revealed) */}
            <div
                className="w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${image})`,
                    width: `${width}px`,
                    height: `${height}px`
                }}
            />

            {/* Canvas Scratch Layer */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 cursor-crosshair touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleEnd}
            />

            {/* Hint/Prompt */}
            {showHint && !isRevealed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                    <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-3 animate-bounce border-2 border-primary/20">
                        <div className="relative">
                            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                            {/* Representing a scratching finger/hand */}
                            <div
                                className="absolute -right-2 -bottom-2 text-2xl animate-[wiggle_1s_ease-in-out_infinite]"
                                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
                            >
                                👆
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-primary font-bold text-lg leading-tight">Secret Memory!</p>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Scratch to reveal</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Reveal Success Overlay */}
            {isRevealed && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-6 text-white text-center animate-in fade-in slide-in-from-bottom-5 duration-700 z-10">
                    <p className="font-handwriting text-2xl drop-shadow-md">A magical moment! ✨</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 mt-1">Found a hidden treasure</p>
                </div>
            )}
        </div>
    );
};

export default ScratchCard;
