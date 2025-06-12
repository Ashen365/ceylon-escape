import React from "react";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";

const featuredDestinations = [
  {
    name: "Ella",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Scenic hill country with lush greenery and waterfalls.",
  },
  {
    name: "Galle Fort",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Historic Dutch fort and vibrant coastal town.",
  },
  {
    name: "Sigiriya",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    description: "Ancient rock fortress with breathtaking views.",
  },
  {
    name: "Kandy",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "Cultural capital, famous for the Temple of the Tooth.",
  },
  {
    name: "Mirissa",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    description: "A tropical paradise with stunning beaches and whale watching.",
  },
  {
    name: "Yala National Park",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
    description: "Home to wildlife safaris and exotic animals.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16 px-4 rounded-lg shadow mb-10">
        <h1 className="text-4xl font-extrabold mb-2 text-center">Welcome to Ceylon Escape!</h1>
        <p className="text-lg mb-4 text-center">
          Discover the wonders of Sri Lanka’s most beautiful destinations.
        </p>
        <div className="flex justify-center">
          <a
            href="/destinations"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded shadow hover:bg-blue-100 transition"
          >
            Explore Destinations
          </a>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* Featured Destinations */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <div
              key={dest.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{dest.name}</h3>
                <p className="text-gray-700 mb-4 flex-1">{dest.description}</p>
                <a
                  href="/destinations"
                  className="text-blue-600 hover:underline font-semibold mt-auto"
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 mt-12 py-10 px-4 text-center rounded-lg max-w-5xl mx-auto shadow">
        <h2 className="text-2xl font-bold mb-2">Ready for Your Adventure?</h2>
        <p className="mb-4 text-gray-700">
          Plan your perfect getaway with Ceylon Escape. Browse our destinations or contact us for custom tours!
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}