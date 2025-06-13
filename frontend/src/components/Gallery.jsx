import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const galleryRef = useRef(null);
  
  const images = [
    { 
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", 
      alt: "Ella Rock",
      location: "Ella"
    },
    { 
      src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", 
      alt: "Tea Plantation",
      location: "Nuwara Eliya"
    },
    { 
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80", 
      alt: "Sigiriya Rock Fortress",
      location: "Sigiriya"
    },
    { 
      src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80", 
      alt: "Temple of the Tooth",
      location: "Kandy"
    },
    { 
      src: "https://images.unsplash.com/photo-1499696016036-71c41e705e41?auto=format&fit=crop&w=600&q=80", 
      alt: "Sri Lankan Elephants",
      location: "Yala National Park"
    },
    { 
      src: "https://images.unsplash.com/photo-1465378552210-88481f999601?auto=format&fit=crop&w=600&q=80", 
      alt: "Scenic Train Journey",
      location: "Hill Country"
    },
    { 
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", 
      alt: "Tropical Beach",
      location: "Mirissa"
    },
    { 
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80", 
      alt: "Colonial Architecture",
      location: "Galle Fort"
    }
  ];
  
  // Animation for gallery items
  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;
    
    gsap.from(".gallery-item", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: galleryElement,
        start: "top 75%",
      },
    });
  }, []);
  
  return (
    <section ref={galleryRef} className="py-20 bg-gradient-to-b from-white to-ceylon-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-ceylon-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Travel Gallery
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-ceylon-400 to-ceylon-600 mx-auto rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Moments captured from our adventures across the beautiful island of Sri Lanka
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="gallery-item group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold">{img.alt}</h3>
                <p className="text-ceylon-100 text-sm">{img.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}