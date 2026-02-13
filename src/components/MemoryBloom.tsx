import { useState, useEffect } from "react";
import Image1 from "@/assets/Image1.jpg";
import Image2 from "@/assets/Image2.jpg";
import Image3 from "@/assets/Image3.jpg";
import Image4 from "@/assets/Image4.jpg";
import Image5 from "@/assets/Image5.jpg";
import Image6 from "@/assets/Image6.jpg";
import Image7 from "@/assets/Image7.jpg";
import Image8 from "@/assets/Image8.jpg";

const MEMORY_IMAGES = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
];

interface FloatingPhotoProps {
    id: number;
    url: string;
    onComplete: (id: number) => void;
}

const FloatingPhoto = ({ id, url, onComplete }: FloatingPhotoProps) => {
    const [style] = useState(() => ({
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        transform: `rotate(${Math.random() * 40 - 20}deg) scale(0.5)`,
        opacity: 0,
    }));

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            onComplete(id);
        }, 6000); // Life span of one photo
        return () => clearTimeout(timer);
    }, [id, onComplete]);

    return (
        <div
            className={`fixed pointer-events-none transition-all duration-[6000ms] ease-out z-[5]
        ${visible ? "scale-[1.5] translate-y-[-100px] opacity-10" : "scale-50 opacity-0"}
      `}
            style={{
                ...style,
                width: "200px",
                height: "250px",
            }}
        >
            <div className="bg-white p-2 pb-8 shadow-xl rounded-sm">
                <div
                    className="w-full h-full bg-cover bg-center grayscale-[30%] sepia-[10%]"
                    style={{ backgroundImage: `url(${url})` }}
                />
            </div>
        </div>
    );
};

const MemoryBloom = () => {
    const [photos, setPhotos] = useState<{ id: number; url: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhotos((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    url: MEMORY_IMAGES[Math.floor(Math.random() * MEMORY_IMAGES.length)]
                },
            ].slice(-5)); // Keep max 5 photos at once
        }, 3000); // New photo every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const removePhoto = (id: number) => {
        setPhotos((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <>
            {photos.map((photo) => (
                <FloatingPhoto
                    key={photo.id}
                    id={photo.id}
                    url={photo.url}
                    onComplete={removePhoto}
                />
            ))}
        </>
    );
};

export default MemoryBloom;
