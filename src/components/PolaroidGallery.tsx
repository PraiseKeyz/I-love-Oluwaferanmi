import Image1 from "@/assets/Image1.jpg";
import Image2 from "@/assets/Image2.jpg";
import Image3 from "@/assets/Image3.jpg";
import Image4 from "@/assets/Image4.jpg";
import Image5 from "@/assets/Image5.jpg";
import Image6 from "@/assets/Image6.jpg";
// import Image7 from "@/assets/Image7.jpg";
// import Image8 from "@/assets/Image8.jpg";

const photos = [
  { id: 1, caption: "Our first date 💕", image: Image1, rotate: "-3deg" },
  { id: 2, caption: "That sunset 🌅", image: Image2, rotate: "2deg" },
  { id: 3, caption: "Being goofy 🤪", image: Image3, rotate: "-1deg" },
  { id: 4, caption: "My favorite smile 😊", image: Image4, rotate: "3deg" },
  { id: 5, caption: "Us vs the world 🌍", image: Image5, rotate: "-2deg" },
  { id: 6, caption: "Forever vibes ✨", image: Image6, rotate: "1deg" },
];

const PolaroidGallery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0"
          style={{ transform: `rotate(${photo.rotate})` }}
        >
          <div className="bg-card rounded-sm shadow-lg p-3 pb-12 relative">
            <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-sm flex items-center justify-center overflow-hidden">
              <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover" />
            </div>
            <p className="absolute bottom-3 left-0 right-0 text-center font-handwriting text-sm md:text-base text-foreground">
              {photo.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolaroidGallery;
