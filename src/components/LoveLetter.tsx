import { useState } from "react";
import { Music, Heart, Sparkles, ArrowRight } from "lucide-react";
import MemoryBloom from "./MemoryBloom";

interface LoveLetterProps {
  recipientName: string;
  onComplete: () => void;
}

const LoveLetter = ({ recipientName, onComplete }: LoveLetterProps) => {
  const [visible, setVisible] = useState(false);

  // Trigger entrance animation
  useState(() => {
    setTimeout(() => setVisible(true), 100);
  });

  return (
    <div className="min-h-screen relative z-10 px-4 py-8 md:py-16 flex flex-col items-center overflow-hidden">
      {/* Background Memories Bloom */}
      {visible && <MemoryBloom />}

      {/* The Letter */}
      <div
        className={`max-w-2xl w-full transition-all duration-1000 ease-out mb-20 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div
          className="bg-valentine-cream rounded-lg shadow-2xl p-6 md:p-10 relative"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 27px, hsl(350 40% 88% / 0.4) 28px)",
          }}
        >
          {/* Decorative corner hearts */}
          <Heart className="absolute top-3 left-3 w-5 h-5 text-primary opacity-30" fill="currentColor" />
          <Heart className="absolute top-3 right-3 w-5 h-5 text-primary opacity-30" fill="currentColor" />
          <Heart className="absolute bottom-3 left-3 w-5 h-5 text-primary opacity-30" fill="currentColor" />
          <Heart className="absolute bottom-3 right-3 w-5 h-5 text-primary opacity-30" fill="currentColor" />

          <h2 className="text-3xl md:text-5xl font-handwriting text-primary text-center mb-6">
            My Dearest {recipientName},
          </h2>

          <div className="font-body text-foreground leading-8 md:leading-9 text-base md:text-lg space-y-4">
            <p>
              Every single day with you feels like Valentine's Day. From the moment you walked into my life,
              everything became brighter, warmer, and infinitely more beautiful. 💕
            </p>
            <p>
              You are my favorite notification, my best good morning, and the reason I smile for no reason
              at all. Your laugh? It's my favorite sound in the entire universe. 🌍✨
            </p>
            <p>
              I love the way you scrunch your nose when you laugh, the way you light up a room
              without even trying, and the way you make even the ordinary moments feel like magic. 🪄
            </p>
            <p>
              Thank you for being my person — my safe place, my adventure partner, my everything.
              I promise to keep making you laugh, to hold your hand through every storm,
              and to love you louder every single day. 🌹
            </p>
            <p className="text-center text-xl md:text-2xl font-handwriting text-primary pt-4">
              Forever & Always Yours,
              <br />
              <span className="text-2xl md:text-3xl">❤️ Your Love ❤️</span>
            </p>
          </div>
        </div>
      </div>

      {/* Continue to Memories Button */}
      <div className={`transition-all duration-1000 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="text-center mb-6">
          <p className="font-body text-muted-foreground italic">p.s. I have one last thing to show you...</p>
        </div>
        <button
          onClick={onComplete}
          className="group relative px-10 py-5 bg-primary text-white rounded-full text-2xl font-body font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
        >
          See Our Memories 📸
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Footer */}
      <p className="mt-16 text-muted-foreground font-body text-sm">
        Made with 💗 just for you
      </p>
    </div>
  );
};

export default LoveLetter;
