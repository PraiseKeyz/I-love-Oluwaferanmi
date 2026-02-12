import { useEffect, useState } from "react";

const EMOJIS = ["❤️", "💌", "🌹", "💕", "✨", "💗", "🥰", "💘"];

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingEmojis = () => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const generated: FloatingEmoji[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 16 + Math.random() * 20,
    }));
    setEmojis(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="absolute"
          style={{
            left: `${e.left}%`,
            fontSize: `${e.size}px`,
            animation: `float-up ${e.duration}s ease-in-out ${e.delay}s infinite`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingEmojis;
