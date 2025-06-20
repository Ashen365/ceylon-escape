import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  ThumbsUp,
  Calendar,
  Heart,
  Star,
  ArrowRight,
  Users,
  ChevronRight,
  Globe,
  Camera,
  Sparkles,
  PlayCircle
} from "lucide-react";

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

// Features Data
const features = [
  {
    icon: <ThumbsUp className="w-10 h-10 text-green-600" />,
    title: "Handpicked Experiences",
    description: "Curated adventures and local activities for every traveler.",
    bg: "from-green-50 to-green-100",
    delay: 0.1
  },
  {
    icon: <Calendar className="w-10 h-10 text-blue-600" />,
    title: "Flexible Itineraries",
    description: "Plan your journey your way, at your pace.",
    bg: "from-blue-50 to-blue-100",
    delay: 0.2
  },
  {
    icon: <Heart className="w-10 h-10 text-pink-600" />,
    title: "Personal Touch",
    description: "Friendly guides and custom recommendations.",
    bg: "from-pink-50 to-pink-100",
    delay: 0.3
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    title: "Top Reviews",
    description: "Travelers love us for our service and care.",
    bg: "from-yellow-50 to-yellow-100",
    delay: 0.4
  },
];

// Destinations Data
const destinations = [
  {
    name: "Ella",
    image: "https://images.squarespace-cdn.com/content/v1/5a3bb03b4c326d76de73ddaa/9732566d-6b33-4a1a-ba0c-1b73ed8848a4/The+Common+Wanderer-9888.jpg?format=2500w",
    desc: "Lush green hills, cool weather, and scenic train rides.",
    color: "from-green-100 to-emerald-100"
  },
  {
    name: "Galle Fort",
    image: "https://do6raq9h04ex.cloudfront.net/sites/8/2021/07/galle-fort-1050x700-1.jpg",
    desc: "Historic fort, charming streets, and ocean views.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    name: "Sigiriya",
    image: "https://www.lovidhu.com/uploads/posts/2021/03//sigiria-sri-lanka-945x630.jpg",
    desc: "Ancient rock fortress with panoramic vistas.",
    color: "from-blue-400 to-cyan-500"
  },
  {
    name: "Mirissa",
    image: "https://cdn.shortpixel.ai/spai/w_1157+q_+ret_img+to_webp/https://www.theglobetrottergp.com/wp-content/uploads/2019/05/oDZ1LpuSxCdJQd5UhbjSA_thumb_60bb.jpg",
    desc: "Golden beach, whale watching, and sunsets.",
    color: "from-teal-400 to-blue-500"
  },
  {
    name: "Kandy",
    image: "https://imagedelivery.net/W3Iz4WACAy2J0qT0cCT3xA/didi/articles/pg7gd1tdoiapvfw3zwk01dbc/public",
    desc: "Cultural city and the sacred Temple of the Tooth.",
    color: "from-purple-400 to-indigo-500"
  },
  {
    name: "Yala National Park",
    image: "https://www.eatsandretreats.com/travel/wp-content/uploads/2018/10/shutterstock_589428650-1.jpg",
    desc: "Wildlife safaris and beautiful landscapes.",
    color: "from-orange-400 to-red-500"
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Our journey with Ceylon Escape was magical! Everything was perfectly organized.",
    rating: 5,
    location: "London, UK",
    delay: 0.1,
  },
  {
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Amazing guides, beautiful places, and unforgettable memories.",
    rating: 5,
    location: "Toronto, Canada",
    delay: 0.2,
  },
  {
    name: "Emma Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "The best trip of my life! Highly recommended for anyone visiting Sri Lanka.",
    rating: 4.5,
    location: "Sydney, Australia",
    delay: 0.3,
  },
];

// Gallery Images
const gallery = [
  "https://travelrebels.com/wp-content/uploads/2024/04/anuradhapura-tempels-533x800-1.jpg",
  "https://us.lakpura.com/cdn/shop/files/LKI9500075-01-E_b9676f68-bb02-4827-ad28-9de134e5b198.jpg?v=1653459755&width=500",
  "https://www.backpackerbanter.com/blog/wp-content/uploads/2018/11/best-places-to-visit-in-sri-lanka-backpacker-travel-sigiriya-kandy-dambulla-elephants.jpg",
  "https://i0.wp.com/srilankatravelandtourism.com/wp-content/uploads/2024/05/Sri-lanka-two-week-itinerary.jpeg?resize=525%2C525&ssl=1",
  "https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/assets/uploads/image_3a41e31adb.jpg",
  "https://www.yogawinetravel.com/wp-content/uploads/2020/03/Lagoon-boat-tour-in-Bentota-Sri-Lanka-750x503.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5IzWjhBZ4Sny-LkShtaLS_3Z_YQjCtC4iQ&s",
  "https://luxuryholidaysasia.com/wp-content/uploads/2024/12/Best-Places-to-Visit-in-Sri-Lanka-2024-Featured-Image.jpg.webp",
  "https://www.planetware.com/wpimages/2023/03/sri-lanka-best-places-to-visit-intro-paragraph-elephants.jpg",
  "https://deih43ym53wif.cloudfront.net/dambulla-sri-lanka-shutterstock_584002507_f8f9739162.jpeg",
  "https://www.localhi.com/wp-content/uploads/2025/02/Meemure-Village.jpg",
  "https://www.planetware.com/wpimages/2020/01/sri-lanka-best-places-to-visit-colombo.jpg",
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Home() {
  // Video modal state
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">
        <ParallaxBackground />
        <FloatingElement delay={0} className="absolute top-20 left-20 text-7xl opacity-20">🌴</FloatingElement>
        <FloatingElement delay={2} className="absolute top-40 right-20 text-5xl opacity-25">🌊</FloatingElement>
        <FloatingElement delay={4} className="absolute bottom-40 left-40 text-6xl opacity-20">🏞️</FloatingElement>
        <FloatingElement delay={3} className="absolute bottom-20 right-40 text-4xl opacity-15">🦚</FloatingElement>
        
        {/* Hero background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://image.cdn2.seaart.me/2025-06-19/d19unr5e878c73cv62kg-1/63df0f809cb776158478f8d8d4c241af_high.webp" 
            alt="Sri Lanka Beach" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-indigo-900/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 py-12 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
          >
            <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
            <span className="text-lg font-medium text-white">Island of Wonders</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg"
          >
            <span className="inline-flex items-center">
              Welcome to <span className="text-yellow-300 ml-2">Ceylon Escape</span>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white mb-12 font-medium drop-shadow"
          >
            Discover, Explore, and Fall in Love with Sri Lanka.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link to="/destinations">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center gap-2">
                Explore Destinations <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            
            <button 
              onClick={() => setShowVideo(true)} 
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium rounded-full hover:bg-white/30 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </motion.div>
        </div>
        
        {/* Video modal popup */}
        {showVideo && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideo(false);
                }} 
                className="absolute top-4 right-4 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
              >
                &times;
              </button>
              <iframe 
                ref={videoRef}
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/uK5HBB_-rSw?autoplay=1" 
                title="Sri Lanka Travel Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f9fafb">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features/Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-pink-600 bg-clip-text text-transparent">
              Why Choose Ceylon Escape?
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <span className="block w-24 h-1.5 rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 shadow-md"></span>
            </motion.div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We create authentic Sri Lankan experiences with attention to every detail
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className={`rounded-3xl shadow-xl p-8 text-center bg-gradient-to-br ${feature.bg} hover:shadow-2xl transition-all duration-300 flex flex-col items-center`}
              >
                <div className="bg-white p-4 rounded-full shadow-md mb-6 inline-block">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-pink-600 bg-clip-text text-transparent">
              Featured Destinations
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-4"
            >
              <span className="block w-24 h-1.5 rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 shadow-md"></span>
            </motion.div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore the diverse landscapes and cultural richness of Sri Lanka
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={cardVariants}
                className="relative group rounded-3xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Card Image with overlay gradient */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* FIX: Reduced overlay opacity for clearer photo */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${dest.color} opacity-30`}></div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 rounded-full px-3 py-1 backdrop-blur-sm shadow">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-sm text-blue-700">{dest.name}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col h-40">
                  <p className="text-gray-700 mb-4 flex-1">{dest.desc}</p>
                  <Link
                    to={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center mt-auto text-pink-600 hover:text-pink-800 font-semibold group"
                  >
                    Discover More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/destinations">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                View All Destinations
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-blue-100/30">
        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300/20 rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-pink-600 bg-clip-text text-transparent flex items-center justify-center">
              <Users className="w-8 h-8 mr-2 text-blue-500" /> Traveler Stories
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-4"
            >
              <span className="block w-24 h-1.5 rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 shadow-md"></span>
            </motion.div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear what our guests say about their Ceylon Escape experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.delay }}
                className="bg-white rounded-3xl shadow-lg p-8 border border-blue-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-md" 
                    />
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} className="inline-block w-5 h-5 text-yellow-400 fill-yellow-400 mr-0.5" />
                  ))}
                  {testimonial.rating % 1 === 0.5 && (
                    <span className="text-yellow-400 text-lg">★½</span>
                  )}
                </div>
                
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                
                <div className="bg-blue-50 rounded-full py-1 px-3 inline-flex items-center">
                  <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-700">Verified Trip</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip - Animated */}
      <section className="py-12 bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 inline-flex items-center">
            <Camera className="w-6 h-6 mr-2 text-blue-500" /> Captured Moments
          </h3>
        </motion.div>
        
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex gap-5 py-4 overflow-x-auto px-6 snap-x snap-mandatory"
        >
          {gallery.map((src, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="snap-center flex-shrink-0"
            >
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="h-48 w-72 object-cover rounded-2xl shadow-lg border-2 border-white"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://th.bing.com/th/id/OIP.S0_0j-ZLkj2a2ywyebOZDwHaE8?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3" 
            alt="Sri Lanka Beach" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/70"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Ready for Your Sri Lankan Adventure?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-blue-100 text-xl max-w-2xl mx-auto mb-8"
            >
              Let our experts craft your perfect journey through this island paradise.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link to="/contact">
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center gap-2">
                  Plan Your Trip <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-all">
                  Learn More About Us
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}