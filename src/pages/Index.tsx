import { useState } from "react";
import FloatingEmojis from "@/components/FloatingEmojis";
import Envelope from "@/components/Envelope";
import LoveLetter from "@/components/LoveLetter";

const RECIPIENT_NAME = "My Love"; // 👈 Change this to her name!

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingEmojis />
      {!isOpen ? (
        <Envelope onOpen={() => setIsOpen(true)} recipientName={RECIPIENT_NAME} />
      ) : (
        <LoveLetter recipientName={RECIPIENT_NAME} />
      )}
    </div>
  );
};

export default Index;
