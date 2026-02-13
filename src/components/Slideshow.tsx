import { useState, useEffect } from "react";
import Image1 from "@/assets/Image1.jpg";
import Image2 from "@/assets/Image2.jpg";
import Image3 from "@/assets/Image3.jpg";
import Image4 from "@/assets/Image4.jpg";
import Image5 from "@/assets/Image5.jpg";
import Image6 from "@/assets/Image6.jpg";
import { ChevronLeft, ChevronRight, Heart, ArrowRight } from "lucide-react";

const PHOTOS = [
    { url: Image1, caption: "Our first date 💕" },
    { url: Image2, caption: "That sunset 🌅" },
    { url: Image3, caption: "Being goofy 🤪" },
    { url: Image4, caption: "My favorite smile 😊" },
    { url: Image5, caption: "Us vs the world 🌍" },
    { url: Image6, caption: "Forever vibes ✨" },
];

interface SlideshowProps {
    onComplete: () => void;
}

const Slideshow = ({ onComplete }: SlideshowProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);

    return (
        <div className="min-h-screen bg-valentine-blush flex flex-col items-center justify-center p-6 pb-20 overflow-x-hidden">
            <div className="max-w-4xl w-full text-center mb-12 animate-in fade-in duration-1000">
                <h2 className="text-4xl md:text-6xl font-handwriting text-primary mb-4">Our Beautiful Journey</h2>
                <p className="text-muted-foreground font-body">Every moment with you is a treasure... 📸</p>
            </div>

            <div className="relative group max-w-2xl w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl bg-white p-4 animate-in zoom-in duration-1000">
                {/* The Slides */}
                {PHOTOS.map((photo, index) => (
                    <div
                        key={index}
                        className={`absolute inset-4 transition-all duration-1000 ease-in-out flex flex-col ${index === currentIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"
                            }`}
                    >
                        <div className="flex-1 overflow-hidden rounded-2xl">
                            <img
                                src={photo.url}
                                alt={photo.caption}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
                            />
                        </div>
                        <div className="h-20 flex items-center justify-center">
                            <p className="font-handwriting text-2xl text-primary">{photo.caption}</p>
                        </div>
                    </div>
                ))}

                {/* Controls */}
                <button
                    onClick={prev}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                {/* Floating Hearts */}
                <div className="absolute top-8 left-8 z-20 animate-bounce">
                    <Heart className="text-white w-6 h-6 fill-white opacity-50" />
                </div>
                <div className="absolute bottom-28 right-12 z-20 animate-pulse">
                    <Heart className="text-white w-8 h-8 fill-white opacity-40" />
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex gap-3 mt-12 mb-16">
                {PHOTOS.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-500 ${i === currentIndex ? "bg-primary w-8 shadow-glow" : "bg-primary/20"
                            }`}
                    />
                ))}
            </div>

            {/* FINAL CTA */}
            <div className="animate-in fade-in slide-in-from-bottom-5 delay-1000 duration-1000">
                <button
                    onClick={onComplete}
                    className="group relative px-10 py-5 bg-primary text-white rounded-full text-2xl font-body font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
                >
                    See My Last Message 💌
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>

            <p className="mt-20 text-muted-foreground font-body text-sm animate-pulse">
                I love you more than words can say. ❤️
            </p>
        </div>
    );
};

export default Slideshow;
