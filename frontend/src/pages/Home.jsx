import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowRight, MapPin, Star, Calendar, Shield, MessageSquare } from "lucide-react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Inline Gallery Component with data
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ceylon-700">Travel Gallery</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Moments captured from our adventures across the beautiful island of Sri Lanka
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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

// Inline Testimonials Component with data
const InlineTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      quote: "The trip to Sri Lanka was beyond my expectations. Our guide was knowledgeable, friendly, and made the experience unforgettable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      quote: "Ceylon Escape planned a perfect vacation for our family. From beaches to wildlife safaris, everything was well organized.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      location: "Sydney, Australia",
      quote: "I've traveled to many places, but Sri Lanka with Ceylon Escape stands out. The attention to detail and personalized service was exceptional.",
      rating: 4.5,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ceylon-700">What Our Travelers Say</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-ceylon-400 to-ceylon-600 mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute -top-5 left-6 bg-ceylon-500 rounded-full p-2">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-yellow-500 text-lg font-bold">
                {"★".repeat(Math.floor(testimonial.rating))}
                {testimonial.rating % 1 !== 0 ? "½" : ""}
              </span>
            </div>
            <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center mt-4">
              <div>
                <h4 className="font-bold text-ceylon-800">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const featuredDestinations = [
  {
    name: "Ella",
    slug: "ella",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Scenic hill country with lush greenery and waterfalls.",
  },
  {
    name: "Galle Fort",
    slug: "galle-fort",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Historic Dutch fort and vibrant coastal town.",
  },
  {
    name: "Sigiriya",
    slug: "sigiriya",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    description: "Ancient rock fortress with breathtaking views.",
  },
  {
    name: "Kandy",
    slug: "kandy",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "Cultural capital, famous for the Temple of the Tooth.",
  },
  {
    name: "Mirissa",
    slug: "mirissa",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    description: "A tropical paradise with stunning beaches and whale watching.",
  },
  {
    name: "Yala National Park",
    slug: "yala-national-park",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
    description: "Home to wildlife safaris and exotic animals.",
  },
];

// Animation variants for staggered children
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

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const destinationsRef = useRef(null);
  
  // Hero section parallax effect
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    gsap.to(".hero-bg", {
      y: '30%',
      scrollTrigger: {
        trigger: heroElement,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    
    // Fade in hero content
    gsap.from(".hero-content", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
    
    // Features section animation
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
    
    // Destinations animation
    gsap.from(".destination-card", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: destinationsRef.current,
        start: "top 75%",
      },
    });
    
  }, []);
  
  return (
    <div>
      {/* Hero Section with Parallax and Glassmorphism */}
      <section 
        ref={heroRef}
        className="relative h-[85vh] overflow-hidden flex items-center justify-center text-white"
      >
        {/* Hero content with glassmorphism effect */}
        <div 
          className="hero-content relative z-20 max-w-4xl mx-auto text-center px-10 py-14 rounded-xl border border-white/20"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-4 text-white tracking-wide"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the Beauty of <span className="text-ceylon-300">Sri Lanka</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience unforgettable adventures through the pearl of the Indian Ocean
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/destinations">
              <Button size="xl" variant="ceylon" className="font-bold shadow-lg">
                Explore Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="xl" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Background image with parallax effect */}
        <div 
          className="hero-bg absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1920&q=80')",
            transform: "translateY(0)",
            height: "100%",
            top: "-10%"
          }}
        >

        {/* Light darkening overlay - reduced opacity for glassmorphism effect */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        

      </div>
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.div>
      </section>
      
      {/* Why Choose Us Section */}
      <section ref={featuresRef} className="py-20 bg-gradient-to-b from-white to-gray-50 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Travel With Ceylon Escape?
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-gradient-to-r from-ceylon-400 to-ceylon-600 mx-auto rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="feature-item p-6 text-center border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-ceylon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-ceylon-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ceylon-900">Curated Destinations</h3>
              <p className="text-gray-600">
                Handpicked locations that showcase the best of Sri Lanka's beauty and culture.
              </p>
            </Card>
            
            <Card className="feature-item p-6 text-center border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-ceylon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-ceylon-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ceylon-900">Exceptional Service</h3>
              <p className="text-gray-600">
                Friendly, knowledgeable guides who are passionate about creating unforgettable experiences.
              </p>
            </Card>
            
            <Card className="feature-item p-6 text-center border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-ceylon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-ceylon-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ceylon-900">Flexible Itineraries</h3>
              <p className="text-gray-600">
                Customizable tours that adapt to your preferences and pace for the perfect journey.
              </p>
            </Card>
            
            <Card className="feature-item p-6 text-center border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-ceylon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-ceylon-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ceylon-900">Safe Travel</h3>
              <p className="text-gray-600">
                Your safety is our priority with strict health protocols and trusted local partners.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section ref={destinationsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Popular Destinations
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore Sri Lanka's breathtaking locations, each offering unique experiences and memories
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredDestinations.map((dest, index) => (
              <motion.div
                key={dest.slug}
                className="destination-card group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                variants={itemVariants}
              >
                <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="mb-4 opacity-90">{dest.description}</p>
                  <Link 
                    to={`/destinations/${dest.slug}`}
                    className="inline-flex items-center text-white font-medium hover:underline"
                  >
                    Discover <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link to="/destinations">
              <Button variant="outline" size="lg" className="border-ceylon-600 text-ceylon-700 hover:bg-ceylon-50">
                View All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Gallery Section (Inline implementation) */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200">
        <InlineGallery />
      </section>
      
      {/* Testimonials Section (Inline implementation) */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <InlineTestimonials />
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-ceylon-700 to-ceylon-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready for Your Sri Lankan Adventure?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join us on a journey through ancient ruins, pristine beaches, misty mountains, and vibrant culture.
            Let Ceylon Escape create your perfect getaway.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button 
                variant="default" 
                size="xl" 
                className="bg-white text-ceylon-800 hover:bg-gray-100"
              >
                Start Planning Your Trip
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}