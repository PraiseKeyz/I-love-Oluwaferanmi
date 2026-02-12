import { useState } from "react";
import { Music, Heart } from "lucide-react";
import PolaroidGallery from "./PolaroidGallery";

interface LoveLetterProps {
  recipientName: string;
}

const LoveLetter = ({ recipientName }: LoveLetterProps) => {
  const [showMusic, setShowMusic] = useState(false);
  const [visible, setVisible] = useState(false);

  // Trigger entrance animation
  useState(() => {
    setTimeout(() => setVisible(true), 100);
  });

  return (
    <div className="min-h-screen relative z-10 px-4 py-8 md:py-16 flex flex-col items-center">
      {/* Music toggle */}
      <button
        onClick={() => setShowMusic(!showMusic)}
        className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle music"
      >
        <Music className="w-5 h-5" />
      </button>

      {/* Music player */}
      {showMusic && (
        <div className="fixed top-16 right-4 z-50 bg-card rounded-lg shadow-xl p-3 w-72">
          <p className="text-xs text-muted-foreground mb-2 font-body">🎵 Our Song</p>
          <iframe
            width="100%"
            height="80"
            src="https://www.youtube.com/embed/450p7goxZqg?si=auto&autoplay=1"
            title="Valentine's music"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded"
          />
          <p className="text-xs text-muted-foreground mt-1 font-body">
            Replace the YouTube link with your song! 🎶
          </p>
        </div>
      )}

      {/* The Letter */}
      <div
        className={`max-w-2xl w-full transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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

      {/* Polaroid Gallery */}
      <div
        className={`w-full max-w-4xl mt-16 transition-all duration-1000 delay-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-3xl md:text-4xl font-handwriting text-primary text-center mb-8">
          Our Memories 📸
        </h3>
        <PolaroidGallery />
      </div>

      {/* Footer */}
      <p className="mt-16 text-muted-foreground font-body text-sm">
        Made with 💗 just for you
      </p>
    </div>
  );
};

export default LoveLetter;
