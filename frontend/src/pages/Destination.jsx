import React from "react";
import { Link } from "react-router-dom";

export default function Destinations() {
  const destinations = [
    {
      name: "Ella",
      slug: "ella",
      description:
        "Hill country paradise with misty mountains, iconic Nine Arches Bridge, and lush tea plantations.",
      img:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      highlights: ["Nine Arches Bridge", "Little Adam’s Peak", "Ravana Falls"],
    },
    {
      name: "Galle Fort",
      slug: "galle-fort",
      description:
        "Historic coastal city with centuries-old ramparts, charming streets, and sunset ocean views.",
      img:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      highlights: ["Dutch Fort", "Lighthouse", "Boutique Cafés"],
    },
    {
      name: "Sigiriya",
      slug: "sigiriya",
      description:
        "Majestic rock fortress rising above the jungle, surrounded by ancient gardens and history.",
      img:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
      highlights: ["Lion Rock", "Frescoes", "Water Gardens"],
    },
    {
      name: "Kandy",
      slug: "kandy",
      description:
        "Cultural heart of Sri Lanka, home to the sacred Temple of the Tooth and scenic lake.",
      img:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      highlights: ["Temple of the Tooth", "Kandy Lake", "Royal Botanic Gardens"],
    },
    {
      name: "Mirissa",
      slug: "mirissa",
      description:
        "Tropical beach haven famous for whale watching, palm-fringed shores, and relaxed vibes.",
      img:
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
      highlights: ["Whale Watching", "Coconut Tree Hill", "Beach Bars"],
    },
    {
      name: "Yala National Park",
      slug: "yala-national-park",
      description:
        "Sri Lanka’s premier wildlife park, teeming with leopards, elephants, and exotic birds.",
      img:
        "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
      highlights: ["Safari Drives", "Leopards", "Bird Watching"],
    },
  ];

  return (
    <div className="relative max-w-6xl mx-auto py-16 px-6">
      {/* Decorative background element */}
      <div className="absolute left-0 right-0 -z-10 opacity-10 pointer-events-none">
        <svg className="mx-auto mt-14" width="320" height="80">
          <ellipse cx="160" cy="40" rx="150" ry="18" fill="#2563eb" />
        </svg>
      </div>

      {/* Page Title & Divider */}
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-2 tracking-tight">
        Our Destinations
      </h1>
      <div className="flex justify-center mb-10">
        <span className="inline-block w-24 h-1.5 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 shadow-md"></span>
      </div>
      <p className="text-center text-gray-600 mb-10 text-lg">
        Explore Sri Lanka’s most breathtaking places, handpicked for unforgettable adventures.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {destinations.map((dest) => (
          <div
            key={dest.slug}
            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 border border-blue-50"
          >
            <img
              src={dest.img}
              alt={dest.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-blue-700 mb-2">{dest.name}</h2>
              <p className="text-gray-700 mb-4 flex-1">{dest.description}</p>
              <ul className="mb-4 space-y-1">
                {dest.highlights.map((item) => (
                  <li key={item} className="flex items-center text-gray-600">
                    <span className="mr-2 text-blue-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={`/destinations/${dest.slug}`}
                className="inline-block mt-auto text-blue-600 hover:underline font-semibold"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}