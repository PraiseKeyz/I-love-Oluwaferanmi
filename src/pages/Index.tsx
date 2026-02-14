import { useState, useRef, useEffect } from "react";
import FloatingEmojis from "@/components/FloatingEmojis";
import Envelope from "@/components/Envelope";
import LoveLetter from "@/components/LoveLetter";
import IntroSequence from "@/components/IntroSequence";
import OpeningStage from "@/components/OpeningStage";
import ScratchStage from "@/components/ScratchStage";
import Slideshow from "@/components/Slideshow";
import FinalProposal from "@/components/FinalProposal";
import ForeverClock from "@/components/ForeverClock";
import { Heart, Sparkles } from "lucide-react";

const RECIPIENT_NAME = "Oluwaferanmi";
const ANNIVERSARY_DATE = "2025-12-21";

type Stage = "opening" | "proposal" | "intro" | "scratch" | "envelope" | "letter" | "slideshow" | "clock" | "end";

const GoodbyeStage = () => (
  <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-[3000ms]">
    <Heart className="w-16 h-16 text-primary mb-8 animate-pulse fill-primary" />
    <h2 className="text-4xl md:text-5xl font-handwriting text-white/90 mb-6">Until Forever...</h2>
    <p className="text-white/40 font-body text-sm uppercase tracking-widest italic">I love you more than words can say. ❤️</p>
    <div className="mt-12 opacity-20">
      <Sparkles className="w-8 h-8 text-valentine-gold animate-bounce" />
    </div>
  </div>
);

const Index = () => {
  const [stage, setStage] = useState<Stage>("opening");
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stage]);

  const startAudio = () => {
    setAudioStarted(true);
  };

  const stopAudio = () => {
    setAudioStarted(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden transition-all duration-1000">
      <FloatingEmojis />

      {audioStarted && stage !== "end" && (
        <div className="fixed -top-[1000px] pointer-events-none opacity-0">
          <iframe
            ref={audioRef}
            width="100%"
            height="80"
            src="https://www.youtube.com/embed/450p7goxZqg?si=auto&autoplay=1&mute=0"
            title="Valentine's music"
            allow="accelerometer; autoplay; encrypted-media;"
          />
        </div>
      )}

      {stage === "opening" && (
        <OpeningStage
          onComplete={() => setStage("proposal")}
          onAction={startAudio}
        />
      )}

      {stage === "proposal" && (
        <FinalProposal
          recipientName={RECIPIENT_NAME}
          onAccept={() => setStage("intro")}
        />
      )}

      {stage === "intro" && (
        <div className="animate-in fade-in zoom-in duration-1000">
          <IntroSequence
            recipientName={RECIPIENT_NAME}
            onComplete={() => setStage("scratch")}
          />
        </div>
      )}

      {stage === "scratch" && (
        <div className="animate-in fade-in slide-in-from-right-10 duration-1000">
          <ScratchStage onComplete={() => setStage("envelope")} />
        </div>
      )}

      {stage === "envelope" && (
        <div className="animate-in fade-in duration-1000">
          <Envelope
            onOpen={() => setStage("letter")}
            recipientName={RECIPIENT_NAME}
          />
        </div>
      )}

      {stage === "letter" && (
        <div className="animate-in slide-in-from-bottom-10 duration-1000">
          <LoveLetter
            recipientName={RECIPIENT_NAME}
            onComplete={() => setStage("slideshow")}
          />
        </div>
      )}

      {stage === "slideshow" && (
        <div className="animate-in fade-in zoom-in duration-1000">
          <Slideshow onComplete={() => setStage("clock")} />
        </div>
      )}

      {stage === "clock" && (
        <div className="animate-in fade-in duration-1000">
          <ForeverClock
            recipientName={RECIPIENT_NAME}
            startDate={ANNIVERSARY_DATE}
            onComplete={() => {
              stopAudio();
              setStage("end");
            }}
          />
        </div>
      )}

      {stage === "end" && <GoodbyeStage />}
    </div>
  );
};

export default Index;
