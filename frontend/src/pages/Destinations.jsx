import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "Ella",
    slug: "ella",
    description:
      "Hill country paradise with misty mountains, iconic Nine Arches Bridge, and lush tea plantations.",
    img:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    highlights: ["Nine Arches Bridge", "Little Adam's Peak", "Ravana Falls"],
    duration: "2-3 days",
    bestSeason: "Year round, Dec-Mar ideal",
  },
  {
    name: "Galle Fort",
    slug: "galle-fort",
    description:
      "Historic coastal city with centuries-old ramparts, charming streets, and sunset ocean views.",
    img:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    highlights: ["Dutch Fort", "Lighthouse", "Boutique Cafés"],
    duration: "1-2 days",
    bestSeason: "Year round",
  },
  {
    name: "Sigiriya",
    slug: "sigiriya",
    description:
      "Majestic rock fortress rising above the jungle, surrounded by ancient gardens and history.",
    img:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    highlights: ["Lion Rock", "Frescoes", "Water Gardens"],
    duration: "1 day",
    bestSeason: "Apr-Sep",
  },
  {
    name: "Kandy",
    slug: "kandy",
    description:
      "Cultural heart of Sri Lanka, home to the sacred Temple of the Tooth and scenic lake.",
    img:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    highlights: ["Temple of the Tooth", "Kandy Lake", "Royal Botanic Gardens"],
    duration: "2-3 days",
    bestSeason: "Jan-Apr, Jul-Sep",
  },
  {
    name: "Mirissa",
    slug: "mirissa",
    description:
      "Tropical beach haven famous for whale watching, palm-fringed shores, and relaxed vibes.",
    img:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    highlights: ["Whale Watching", "Coconut Tree Hill", "Beach Bars"],
    duration: "2-4 days",
    bestSeason: "Nov-Apr",
  },
  {
    name: "Yala National Park",
    slug: "yala-national-park",
    description:
      "Sri Lanka's premier wildlife park, teeming with leopards, elephants, and exotic birds.",
    img:
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
    highlights: ["Safari Drives", "Leopards", "Bird Watching"],
    duration: "1-2 days",
    bestSeason: "Feb-Jul",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  },
};

export default function Destinations() {
  const destinationsRef = useRef(null);
  
  useEffect(() => {
    const destinationsElement = destinationsRef.current;
    if (!destinationsElement) return;
    
    gsap.from(".highlight-item", {
      y: 10,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      scrollTrigger: {
        trigger: ".destination-card",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto py-16 px-6">
      {/* Decorative background element */}
      <div className="absolute left-0 right-0 -z-10 opacity-10 pointer-events-none">
        <svg className="mx-auto mt-14" width="320" height="80">
          <ellipse cx="160" cy="40" rx="150" ry="18" fill="#3b82f6" />
        </svg>
      </div>

      {/* Page Title & Divider */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center text-ceylon-700 mb-2 tracking-tight"
      >
        Our Destinations
      </motion.h1>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "6rem" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex justify-center mb-4"
      >
        <span className="block w-24 h-1.5 rounded bg-gradient-to-r from-ceylon-400 via-ceylon-600 to-ceylon-400 shadow-md"></span>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-gray-600 mb-10 text-lg"
      >
        Explore Sri Lanka's most breathtaking places, handpicked for unforgettable adventures.
      </motion.p>
      
      <motion.div 
        ref={destinationsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {destinations.map((dest) => (
          <motion.div
            key={dest.slug}
            className="destination-card"
            variants={itemVariants}
          >
            <Card className="overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border-none shadow-lg">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h2 className="text-white text-2xl font-bold p-4">{dest.name}</h2>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-700 mb-4 flex-1">{dest.description}</p>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-ceylon-500" />
                    <span>Highlights:</span>
                  </div>
                  <ul className="pl-6 space-y-1">
                    {dest.highlights.map((item) => (
                      <li key={item} className="highlight-item flex items-center text-gray-600 text-sm">
                        <span className="mr-2 text-ceylon-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar className="w-4 h-4 mr-1 text-ceylon-500" />
                    <span className="text-gray-700 font-medium">{dest.duration}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">Best: {dest.bestSeason}</span>
                  </div>
                </div>
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="inline-flex items-center mt-auto text-ceylon-600 hover:text-ceylon-800 font-semibold"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}