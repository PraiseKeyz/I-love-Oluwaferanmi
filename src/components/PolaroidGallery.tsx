const photos = [
  { id: 1, caption: "Our first date 💕", rotate: "-3deg" },
  { id: 2, caption: "That sunset 🌅", rotate: "2deg" },
  { id: 3, caption: "Being goofy 🤪", rotate: "-1deg" },
  { id: 4, caption: "My favorite smile 😊", rotate: "3deg" },
  { id: 5, caption: "Us vs the world 🌍", rotate: "-2deg" },
  { id: 6, caption: "Forever vibes ✨", rotate: "1deg" },
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
            {/* Photo placeholder */}
            <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-sm flex items-center justify-center overflow-hidden">
              <span className="text-4xl md:text-5xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                📷
              </span>
            </div>

            {/* Caption */}
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
