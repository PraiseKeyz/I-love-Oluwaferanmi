import { useState, useEffect } from "react";
import { Heart, Timer } from "lucide-react";

interface ForeverClockProps {
    startDate: string; // Anniversary date in ISO format or similar
    recipientName: string;
}

const ForeverClock = ({ startDate, recipientName }: ForeverClockProps) => {
    const [timeSince, setTimeSince] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const start = new Date(startDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = now - start;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeSince({ days, hours, minutes, seconds });
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div className="fixed inset-0 z-[150] bg-valentine-blush flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white/60 backdrop-blur-lg p-10 md:p-16 rounded-[40px] shadow-2xl border-2 border-primary/10 max-w-2xl w-full animate-in zoom-in duration-1000">
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <Timer className="w-16 h-16 text-primary animate-pulse" />
                        <Heart className="absolute -top-2 -right-2 w-6 h-6 text-primary fill-primary" />
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-handwriting text-primary mb-10">
                    How long I've loved you...
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
                    {[
                        { label: "Days", value: timeSince.days },
                        { label: "Hours", value: timeSince.hours },
                        { label: "Minutes", value: timeSince.minutes },
                        { label: "Seconds", value: timeSince.seconds },
                    ].map((item, i) => (
                        <div key={item.label} className="flex flex-col animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${i * 100}ms` }}>
                            <span className="text-4xl md:text-5xl font-body font-bold text-primary tabular-nums">
                                {item.value}
                            </span>
                            <span className="text-sm md:text-base text-muted-foreground font-body uppercase tracking-widest mt-2">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="text-xl md:text-2xl font-handwriting text-primary/80 italic leading-relaxed">
                    "Every second has been a blessing, and I'll love you for infinity more, {recipientName}."
                </p>

                <div className="mt-12 flex items-center justify-center gap-2 text-primary">
                    <Heart className="fill-current w-4 h-4" />
                    <Heart className="fill-current w-6 h-6" />
                    <Heart className="fill-current w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default ForeverClock;
