# 🌹 The Ultimate Valentine Experience 💖

A deeply immersive, highly interactive, and visually stunning web application designed as a magical Valentine's Day surprise. This isn't just a letter; it's a cinematic journey through memories and love.

## ✨ The Journey Flow

1.  **The Big Bang Opening**: A mysterious dark void with a pulsing heart. Clicking it triggers a massive confetti explosion and starts the journey.
2.  **The Proposal**: A playful "Will you be my Valentine?" screen featuring a cheeky "No" button that teleports away when hovered, making "Yes" the only destiny!
3.  **The Intro Cards**: A hand of fanned-out secrets. Interaction reveals hidden messages before moving forward.
4.  **The Scratch Reveal**: A "Fore-Scenario" where the user must scratch away a silver layer to unlock the secret path to the letter.
5.  **The Love Letter**: A personalized, handwritten-style letter featuring the **"Memory Bloom"** effect—where personal photos drift and bloom in the background like dreams.
6.  **Cinema Slideshow**: A dedicated stage for your favorite photos, cycling elegantly with captions and manual controls.
7.  **The Forever Clock**: A final, emotional anchor showing exactly how many Days, Hours, Minutes, and Seconds you've shared together, down to the last heartbeat.

## 🚀 Key Features

-   **🎵 Cinematic Audio**: Background music starts automatically upon the first interaction and persists through all stages.
-   **✨ Premium Aesthetics**: Built with a custom "Valentine Blush" color palette, elegant typography, and smooth glassmorphism.
-   **📸 Dynamic Memories**: Integrated photo gallery and background floaters utilizing local assets.
-   **🖱️ Interactive Micro-Animations**: From "dodging" buttons to pulsing glows and typewriter text effects.
-   **📱 Fully Responsive**: Optimized for both high-end desktops and mobile devices (perfect for a surprise phone link!).

## 🛠️ Technology Stack

-   **React + Vite**: For blazing-fast performance and modern component architecture.
-   **Tailwind CSS**: Custom utility-first styling for a unique, premium design.
-   **Lucide React**: Clean, elegant iconography.
-   **Canvas Confetti**: High-performance particle effects for celebration moments.
-   **Framer Motion / CSS Keyframes**: Powering the advanced entrance and hover animations.

## ⚙️ Customization Guide

To make this truly yours, you can easily edit the following in `src/pages/Index.tsx`:

-   `RECIPIENT_NAME`: Change this to her name.
-   `ANNIVERSARY_DATE`: Set the date your journey started for the **Forever Clock**.
-   `QUOTES` (in `IntroSequence.tsx`): Customize the messages on the floating cards.
-   `PHOTOS` (in `Slideshow.tsx`): Swap the local images in `src/assets/` to your own photos.

## 🛠️ Getting Started

```sh
# Install dependencies
npm i

# Start the magic locally
npm run dev
```

---

Made with ❤️ for someone special.
