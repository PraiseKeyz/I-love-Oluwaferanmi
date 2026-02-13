import { useState, useRef } from "react";
import FloatingEmojis from "@/components/FloatingEmojis";
import Envelope from "@/components/Envelope";
import LoveLetter from "@/components/LoveLetter";
import IntroSequence from "@/components/IntroSequence";
import OpeningStage from "@/components/OpeningStage";
import ScratchStage from "@/components/ScratchStage";
import Slideshow from "@/components/Slideshow";
import FinalProposal from "@/components/FinalProposal";
import ForeverClock from "@/components/ForeverClock";

const RECIPIENT_NAME = "Oluwaferanmi";
const ANNIVERSARY_DATE = "2023-02-14";

type Stage = "opening" | "proposal" | "intro" | "scratch" | "envelope" | "letter" | "slideshow" | "clock";

const Index = () => {
  const [stage, setStage] = useState<Stage>("opening");
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const startAudio = () => {
    setAudioStarted(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden transition-all duration-1000">
      <FloatingEmojis />

      {audioStarted && (
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
        <div className="animate-in fade-in duration-1000">
          <FinalProposal
            recipientName={RECIPIENT_NAME}
            onAccept={() => setStage("intro")}
          />
        </div>
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
          />
        </div>
      )}
    </div>
  );
};

export default Index;
