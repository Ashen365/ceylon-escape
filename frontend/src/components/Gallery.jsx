export default function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", alt: "Sri Lanka Beach" },
    { src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", alt: "Tea Plantation" },
    { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80", alt: "Sigiriya Rock" },
    { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80", alt: "Temple" },
    { src: "https://images.unsplash.com/photo-1499696016036-71c41e705e41?auto=format&fit=crop&w=400&q=80", alt: "Wildlife" },
    { src: "https://images.unsplash.com/photo-1465378552210-88481f999601?auto=format&fit=crop&w=400&q=80", alt: "Train Ride" }
  ];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">Travel Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-40 object-cover hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}