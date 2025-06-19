import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Camera, 
  Heart, 
  ChevronRight, 
  Instagram, 
  X, 
  Search
} from "lucide-react";

// Import destinations from data file
import { destinations } from "../data/destination";

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <div
    className={`animate-float ${className}`}
    style={{
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `}</style>
  </div>
);

// Parallax Background
const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)`
        }}
      />
    </div>
  );
};

// Featured Destination Photos
const featuredPhotos = [
  "https://images.unsplash.com/photo-1590789251993-b0f9cf91cffa?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1602904867537-7db9adecd89c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1599326291105-89e3cd99fbce?auto=format&fit=crop&w=600&q=80",
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// 3D Card Animation Component
const AnimatedCard = ({ children, tiltDirection }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / 15;
    const y = (e.clientY - centerY) / 15;
    setPosition({ x: -y, y: tiltDirection === 'left' ? -x : x });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(position.x, springConfig);
  const rotateY = useSpring(position.y, springConfig);

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "all 0.5s ease",
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Quick Scroll To Top Component
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed right-10 bottom-10 p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl z-50 transform hover:scale-110 transition-transform"
        >
          <ChevronRight className="h-6 w-6 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Filter function
  const filterDestinations = () => {
    if (activeCategory === 'all') return destinations;
    
    const filters = {
      'beach': (dest) => dest.name === "Mirissa" || dest.name === "Galle Fort",
      'mountain': (dest) => dest.name === "Ella" || dest.name === "Kandy",
      'wildlife': (dest) => dest.name === "Yala National Park",
      'culture': (dest) => dest.name === "Kandy" || dest.name === "Sigiriya" || dest.name === "Galle Fort"
    };
    
    return filters[activeCategory] 
      ? destinations.filter(filters[activeCategory])
      : destinations;
  };
  
  const filteredDestinations = filterDestinations();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-300 via-white to-pink-250 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-150"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Quick Scroll Button */}
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <ParallaxBackground />
        <FloatingElement delay={0} className="absolute top-20 left-20 text-7xl opacity-20">🌴</FloatingElement>
        <FloatingElement delay={2} className="absolute top-40 right-20 text-5xl opacity-25">🌊</FloatingElement>
        <FloatingElement delay={4} className="absolute bottom-40 left-40 text-6xl opacity-20">🏞️</FloatingElement>
        <FloatingElement delay={3} className="absolute bottom-20 right-40 text-4xl opacity-15">🦚</FloatingElement>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
          >
            <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
            <span className="text-lg font-medium text-black">Explore Sri Lanka</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-500 bg-clip-text text-transparent"
          >
            Dream Destinations
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-blue-900/80 mb-10"
          >
            Handpicked adventures, iconic landscapes, and hidden gems—crafted for your perfect escape.
          </motion.p>
          
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative max-w-lg mx-auto"
          >
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className={`flex items-center gap-3 w-full bg-black/20 backdrop-blur-lg border border-red/30 rounded-full px-6 py-4 text-left text-black ${searchOpen ? 'rounded-b-none' : ''}`}
            >
              <Search className="w-5 h-5" />
              <span>Search destinations or experiences...</span>
            </button>
            
            <AnimatePresence>
              {searchOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 right-0 bg-white/90 backdrop-blur-md rounded-b-2xl shadow-xl z-20 overflow-hidden"
                >
                  <ul className="py-3">
                    {destinations.map((dest) => (
                      <li key={dest.slug}>
                        <Link 
                          to={`/destinations/${dest.slug}`} 
                          className="flex items-center gap-3 px-6 py-3 hover:bg-blue-50 transition-colors"
                          onClick={() => setSearchOpen(false)}
                        >
                          <img 
                            src={dest.img} 
                            alt={dest.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-blue-900">{dest.name}</p>
                            <p className="text-sm text-gray-500">{dest.duration} • {dest.highlights[0]}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
            <path d="M0,32L48,53.3C96,75,192,117,288,122.7C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Category Filter - Added margin to create more space */}
      <motion.section 
        className="relative bg-white pt-10 pb-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-3 flex-nowrap md:flex-wrap md:justify-center">
            {[
              {id: 'all', label: 'All Destinations', icon: '🌏'},
              {id: 'beach', label: 'Beaches', icon: '🏖️'},
              {id: 'mountain', label: 'Mountains', icon: '🏔️'},
              {id: 'culture', label: 'Cultural Sites', icon: '🏛️'},
              {id: 'wildlife', label: 'Wildlife', icon: '🐘'}
            ].map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Destinations Grid - Adjusted padding and added margin-top */}
      <section className="relative max-w-7xl mx-auto px-6 py-8 mt-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-700 to-pink-600 bg-clip-text text-transparent"
        >
          Our Destinations
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <span className="block w-24 h-1.5 rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 shadow-md"></span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-12 text-lg"
        >
          From misty mountains to golden coasts, discover the soul of Sri Lanka.
        </motion.p>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {filteredDestinations.map((dest, i) => (
              <motion.div
                key={dest.slug}
                variants={fadeInUp}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="h-full"
              >
                <AnimatedCard tiltDirection={dest.tiltDirection}>
                  <div className="relative group rounded-3xl shadow-xl overflow-hidden bg-white border-0 hover:shadow-2xl transition-shadow duration-300 h-full">
                    {/* Like button */}
                    <button className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors">
                      <Heart className="w-5 h-5 text-white" />
                    </button>
                    
                    {/* Card Image with overlay gradient */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${dest.color} opacity-70`}></div>
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 rounded-full px-3 py-1 backdrop-blur-sm shadow">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-sm text-blue-700">{dest.name}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/70 rounded-full px-3 py-1 shadow">
                        <Camera className="w-4 h-4 text-pink-500" />
                        <span className="text-xs text-pink-700">{dest.highlights[0]}</span>
                      </div>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-gray-700 mb-4 flex-1">{dest.description}</p>
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                          <span className="font-medium">Highlights:</span>
                        </div>
                        <ul className="pl-6 space-y-1">
                          {dest.highlights.map((item) => (
                            <motion.li 
                              key={item} 
                              className="flex items-center text-gray-600 text-sm"
                              whileHover={{ x: 5, transition: { duration: 0.2 } }}
                            >
                              <span className="mr-2 text-pink-500">•</span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex items-center text-sm text-gray-600 mt-3">
                          <Calendar className="w-4 h-4 mr-1 text-purple-500" />
                          <span className="text-gray-700 font-medium">{dest.duration}</span>
                          <span className="mx-2">•</span>
                          <span className="text-gray-600">Best: {dest.bestSeason}</span>
                        </div>
                      </div>
                      <Link
                        to={`/destinations/${dest.slug}`}
                        className="inline-flex items-center mt-auto text-pink-600 hover:text-pink-800 font-semibold group"
                      >
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Enhanced spacing after destinations grid for better visual flow */}
      <div className="h-12"></div>

      {/* Featured Photos section would go here */}
      {/* Newsletter & CTA section would go here */}
    </div>
  );
}