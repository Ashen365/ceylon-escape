import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowRight,
  MapPin,
  Star,
  Calendar,
  Shield,
  MessageSquare,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Inline Gallery Component
const InlineGallery = () => {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      alt: "Ella Rock",
    },
    {
      url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      alt: "Galle Fort",
    },
    {
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
      alt: "Sigiriya",
    },
    {
      url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      alt: "Kandy Temple",
    },
    {
      url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
      alt: "Mirissa Beach",
    },
    {
      url: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
      alt: "Yala National Park",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Travel Gallery
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Moments captured from our adventures across the beautiful island of
          Sri Lanka
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, idx) => (
          <motion.div
            key={idx}
            className="overflow-hidden rounded-lg shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="aspect-w-16 aspect-h-10 overflow-hidden">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Inline Testimonials Component
const InlineTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      quote:
        "The trip to Sri Lanka was beyond my expectations. Our guide was knowledgeable, friendly, and made the experience unforgettable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      quote:
        "Ceylon Escape planned a perfect vacation for our family. From beaches to wildlife safaris, everything was well organized.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      location: "Sydney, Australia",
      quote:
        "I've traveled to many places, but Sri Lanka with Ceylon Escape stands out. The attention to detail and personalized service was exceptional.",
      rating: 4.5,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          What Our Travelers Say
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-lg shadow-lg p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="absolute -top-5 left-6 bg-blue-500 rounded-full p-2">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="mb-4 flex items-center">
              <span className="text-yellow-500 text-lg font-bold">
                {"★".repeat(Math.floor(t.rating))}
                {t.rating % 1 !== 0 ? "½" : ""}
              </span>
            </div>
            <p className="italic text-gray-600 mb-4">"{t.quote}"</p>
            <div className="flex items-center mt-4">
              <div>
                <h4 className="font-bold text-gray-800">{t.name}</h4>
                <p className="text-gray-500 text-sm">{t.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Featured Destinations data
const featuredDestinations = [
  {
    name: "Ella",
    slug: "ella",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Scenic hill country with lush greenery and waterfalls.",
  },
  {
    name: "Galle Fort",
    slug: "galle-fort",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Historic Dutch fort and vibrant coastal town.",
  },
  {
    name: "Sigiriya",
    slug: "sigiriya",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    description: "Ancient rock fortress with breathtaking views.",
  },
  {
    name: "Kandy",
    slug: "kandy",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "Cultural capital, famous for the Temple of the Tooth.",
  },
  {
    name: "Mirissa",
    slug: "mirissa",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    description: "A tropical paradise with stunning beaches and whale watching.",
  },
  {
    name: "Yala National Park",
    slug: "yala-national-park",
    image:
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
    description: "Home to wildlife safaris and exotic animals.",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const destinationsRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (heroEl) {
      gsap.to(".hero-bg", {
        y: "30%",
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".hero-content", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }

    if (featuresRef.current) {
      gsap.from(".feature-item", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[85vh] overflow-hidden flex items-center justify-center"
      >
        <div
          className="hero-bg absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80')",
            top: "-5%",
            height: "110%",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-70 z-10" />
        <div className="hero-content relative z-20 text-center text-white max-w-4xl px-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the Beauty of{" "}
            <span className="text-blue-400">Sri Lanka</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience unforgettable adventures through the pearl of the Indian
            Ocean
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/destinations">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-lg">
                Explore Destinations{" "}
                <ArrowRight className="inline ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-gray-900">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Why Travel With Ceylon Escape */}
      <section
        ref={featuresRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Travel With Ceylon Escape?
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="feature-item p-6 text-center shadow-lg hover:shadow-xl transition">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">
                Curated Destinations
              </h3>
              <p className="text-gray-600">
                Handpicked locations that showcase the best of Sri Lanka’s beauty
                and culture.
              </p>
            </Card>

            <Card className="feature-item p-6 text-center shadow-lg hover:shadow-xl transition">
              <Star className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">
                Exceptional Service
              </h3>
              <p className="text-gray-600">
                Friendly, knowledgeable guides passionate about your perfect
                journey.
              </p>
            </Card>

            <Card className="feature-item p-6 text-center shadow-lg hover:shadow-xl transition">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">
                Flexible Itineraries
              </h3>
              <p className="text-gray-600">
                Custom tours adapting to your preferences and pace.
              </p>
            </Card>

            <Card className="feature-item p-6 text-center shadow-lg hover:shadow-xl transition">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Safe Travel</h3>
              <p className="text-gray-600">
                Your safety is our priority with strict health protocols.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-gray-100">
        <InlineGallery />
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <InlineTestimonials />
      </section>
    </div>
  );
}