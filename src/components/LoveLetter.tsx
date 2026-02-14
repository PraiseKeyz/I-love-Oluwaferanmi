import { useState, useEffect } from "react";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import MemoryBloom from "./MemoryBloom";

interface LoveLetterProps {
  recipientName: string;
  onComplete: () => void;
}

const LoveLetter = ({ recipientName, onComplete }: LoveLetterProps) => {
  const [visible, setVisible] = useState(false);
  const [activeParagraphs, setActiveParagraphs] = useState<number[]>([]);

  useEffect(() => {
    setVisible(true);
    const timers = [1, 2, 3, 4, 5, 6, 7, 8].map((id) =>
      setTimeout(() => setActiveParagraphs(prev => [...prev, id]), 500 + ((id - 1) * 2000))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const paragraphs = [
    `My Dearest ${recipientName}, words often fail me when I try to describe what you mean to me, but today, I want to try. From the very first moment our paths crossed, my world shifted into a higher resolution—colors became more vibrant, and life found a melody it had been missing. 💕`,
    `I love the small things that you might not even notice. The way your eyes catch the light when you're excited, the gentle way you handle the world's noise, and the effortless kindness you show to everyone around you. You are a rare kind of magic in an ordinary world. ✨`,
    `You are my favorite notification in a busy day, my anchor when the waves get a little too high, and the first person I want to share every win and every worry with. Your laugh? It's the most beautiful sound I've ever heard—a symphony that I never want to end. 🌍🎶`,
    `What we have isn't just about the big moments; it's about the quiet ones. The shared glances, the comfortable silences, and the way your hand feels perfectly at home in mine. You've taught me that home isn't a place, but a person. And for me, that person is you. 🏡❤️`,
    `I promise to keep choosing you, every single day. I promise to be your biggest cheerleader, your safest place, and your most devoted partner through all the chapters we've yet to write. Every sunset we've watched together is just a preface to the many more I want to see by your side. 🌅🌹`,
    `Thank you for being exactly who you are. Thank you for loving me, for challenging me, and for being the best part of my every day. My heart is, and always will be, completely yours.`,
  ];

  return (
    <div className="min-h-screen relative z-10 px-4 py-12 md:py-24 flex flex-col items-center overflow-x-hidden">
      {visible && <MemoryBloom />}

      <div
        className={`max-w-2xl w-full transition-all duration-[2000ms] ease-out mb-20 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
      >
        <div
          className="bg-[#fffdfa] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 md:p-16 relative border border-primary/5"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(235, 126, 144, 0.1) 32px)",
            lineHeight: "32px"
          }}
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary w-20 h-20 rounded-full flex items-center justify-center shadow-xl animate-bounce scale-110 z-20 border-4 border-white">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>

          <h2 className="text-4xl md:text-6xl font-handwriting text-primary text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            My Dearest {recipientName},
          </h2>

          <div className="font-body text-foreground/80 leading-relaxed text-lg md:text-xl space-y-8 italic">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`transition-all duration-1000 transform ${activeParagraphs.includes(i + 1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                {text}
              </p>
            ))}

            <div className={`pt-12 text-center transition-all duration-1000 delay-1000 ${activeParagraphs.includes(7) ? "opacity-100" : "opacity-0"
              }`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-valentine-gold" />
                <p className="font-handwriting text-2xl text-primary">Forever & Always Yours,</p>
                <Sparkles className="w-5 h-5 text-valentine-gold" />
              </div>
              <span className="text-3xl md:text-4xl font-handwriting text-primary font-bold drop-shadow-sm">
                ❤️ Your Love ❤️
              </span>
            </div>
          </div>
        </div>
      </div>

      {activeParagraphs.includes(8) && (
        <div className="animate-in fade-in zoom-in slide-in-from-bottom-5 duration-1000 text-center">
          <p className="font-body text-muted-foreground italic mb-6">p.s. I have one last thing to show you...</p>
          <button
            onClick={onComplete}
            className="group relative px-12 py-6 bg-primary text-white rounded-full text-2xl font-body font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
          >
            See Our Memories 📸
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
          </button>
        </div>
      )}

      <p className="mt-24 text-muted-foreground/50 font-body text-sm tracking-widest uppercase">
        Handcrafted with 💗 for my Valentine
      </p>
    </div>
  );
};

export default LoveLetter;
