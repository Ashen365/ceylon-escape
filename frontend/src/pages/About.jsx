import React, { useEffect, useRef, useState } from "react";
import { 
  Users, 
  Calendar, 
  Heart, 
  Globe, 
  Award, 
  MapPin, 
  MessageCircle, 
  ChevronRight,
  Star,
  Sparkles,
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  Play,
  Quote
} from "lucide-react";

// Team Members Data
const team = [
  {
    name: "Nimal Perera",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "With 15+ years in tourism, Nimal created Ceylon Escape to showcase Sri Lanka's beauty to the world.",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Sanduni Jayasinghe",
    role: "Lead Travel Designer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Sanduni crafts unique itineraries that blend adventure, culture, and relaxation for unforgettable journeys.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Chathura Fernando",
    role: "Operations Manager",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    bio: "Chathura ensures every tour runs smoothly, from transportation to accommodations and special requests.",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Dilani Senanayake",
    role: "Marketing Specialist",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Dilani shares Ceylon Escape's story with the world through compelling digital content and partnerships.",
    color: "from-orange-500 to-red-500"
  },
  {
    name: "Ashan Silva",
    role: "Adventure Guide",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
    bio: "With expertise in wildlife and outdoor activities, Ashan brings excitement to every adventure tour.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    name: "Nadeesha Weerasinghe",
    role: "Customer Relations",
    img: "https://randomuser.me/api/portraits/women/90.jpg",
    bio: "Nadeesha ensures every traveler receives personalized attention before, during, and after their journey.",
    color: "from-teal-500 to-blue-500"
  },
];

// Timeline Data
const timeline = [
  {
    year: "2019",
    event: "Ceylon Escape founded with a vision to make Sri Lanka accessible to global travelers.",
    icon: "🚀",
    highlight: "Founded"
  },
  {
    year: "2020",
    event: "Launched our first signature wildlife and cultural tours across the island.",
    icon: "🦁",
    highlight: "First Tours"
  },
  {
    year: "2021",
    event: "Reached 1,000+ happy travelers and launched exclusive eco-tours to preserve natural beauty.",
    icon: "🌿",
    highlight: "1K+ Travelers"
  },
  {
    year: "2022",
    event: "Expanded to offer custom honeymoon and family packages with personalized experiences.",
    icon: "💍",
    highlight: "Expanded Services"
  },
  {
    year: "2023",
    event: "Awarded 'Best Local Tour Operator' by Sri Lanka Tourism Board for excellence in service.",
    icon: "🏆",
    highlight: "Award Winner"
  },
  {
    year: "2024",
    event: "Partnered with local communities for sustainable tourism projects that benefit local economies.",
    icon: "🤝",
    highlight: "Community Focus"
  },
];

// Core Values Data
const values = [
  {
    title: "Authenticity",
    description: "We showcase the real Sri Lanka beyond tourist hotspots, connecting visitors with local cultures and traditions.",
    icon: <Heart className="h-8 w-8" />,
    gradient: "from-rose-400 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50"
  },
  {
    title: "Sustainability",
    description: "Our tours are designed with environmental preservation in mind, supporting local communities and ecosystems.",
    icon: <Globe className="h-8 w-8" />,
    gradient: "from-emerald-400 to-green-500",
    bgGradient: "from-emerald-50 to-green-50"
  },
  {
    title: "Excellence",
    description: "From expert guides to premium accommodations, we ensure every aspect of your journey exceeds expectations.",
    icon: <Award className="h-8 w-8" />,
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50"
  },
];

// Features Data
const features = [
  {
    title: "Expert Local Guides",
    description: "Our guides are locals with in-depth knowledge and passion for sharing their homeland.",
    icon: "🌍",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    title: "Personalized Itineraries",
    description: "Every journey is crafted to match your interests, pace, and style of travel.",
    icon: "🗺️",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Sustainable Tourism",
    description: "We prioritize eco-friendly practices and support conservation efforts across the island.",
    icon: "🌱",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Community Partnerships",
    description: "Your travels directly benefit local communities through our partnership programs.",
    icon: "🤝",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Premium Experiences",
    description: "Enjoy handpicked accommodations and exclusive activities not available elsewhere.",
    icon: "💎",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "24/7 Support",
    description: "Travel with peace of mind knowing our team is always available to assist you.",
    icon: "🛡️",
    gradient: "from-teal-500 to-blue-500"
  },
];

// Testimonials Data
const testimonials = [
  {
    quote: "The attention to detail and personalization of our trip was beyond our expectations. We felt like we experienced the real Sri Lanka.",
    name: "Sarah Johnson",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    quote: "Our guide was exceptional, sharing insights about local culture that we wouldn't have discovered on our own. Truly special.",
    name: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    quote: "Ceylon Escape made our honeymoon absolutely magical. Every moment was perfectly planned and executed with love.",
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

// Stats Data
const stats = [
  { number: "2019", label: "Founded", icon: "🚀" },
  { number: "3000+", label: "Happy Travelers", icon: "😊" },
  { number: "50+", label: "Destinations", icon: "📍" },
  { number: "100%", label: "Satisfaction Rate", icon: "⭐" }
];

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

// Parallax Background Component
const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
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

// Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime = null;
    const startValue = 0;
    const endValue = parseInt(end.replace(/\D/g, ''));

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      setCount(Math.floor(progress * endValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isIntersecting, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function About() {
  const [activeSection, setActiveSection] = useState('hero');
  
  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
        <ParallaxBackground />
        
        {/* Animated Background Elements */}
        <FloatingElement delay={0} className="absolute top-20 left-20 text-6xl opacity-20">
          ✨
        </FloatingElement>
        <FloatingElement delay={2} className="absolute top-40 right-20 text-4xl opacity-30">
          🌺
        </FloatingElement>
        <FloatingElement delay={4} className="absolute bottom-40 left-40 text-5xl opacity-25">
          🏛️
        </FloatingElement>
        <FloatingElement delay={3} className="absolute bottom-20 right-40 text-3xl opacity-20">
          🦋
        </FloatingElement>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-lg font-medium">Discover Authentic Sri Lanka</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Our <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Story</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12 text-blue-100">
            Founded in 2019, Ceylon Escape was born from a passion for sharing the authentic beauty 
            of Sri Lanka with travelers from around the world. We create unforgettable journeys that 
            connect hearts, cultures, and dreams.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <span className="flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="group flex items-center text-white/90 hover:text-white font-medium transition-colors">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3 group-hover:bg-white/30 transition-colors">
                <Play className="w-5 h-5" />
              </div>
              Watch Our Story
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  <AnimatedCounter end={stat.number} />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl mr-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To create personalized, immersive travel experiences that delight our guests while preserving Sri Lanka's cultural integrity 
                  and natural environment. We commit to excellence, authenticity, and positive impact in everything we do.
                </p>
              </div>
              
              <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl mr-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To be the premier gateway for travelers seeking authentic, transformative experiences in Sri Lanka, fostering cross-cultural understanding and sustainable tourism.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://i.ytimg.com/vi/o-rK8VCfqbI/maxresdefault.jpg"
                alt="Sri Lanka landscape"
                className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-blue-100"></div>
            <div className="space-y-16">
              {timeline.map((item, idx) => (
                <div key={idx} className={`flex items-center ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className={`w-1/2 ${idx % 2 === 0 ? "pr-8" : "pl-8"} flex flex-col items-${idx % 2 === 0 ? "end" : "start"}`}>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4 shadow-lg">
                      {item.icon}
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
                      <div className="text-lg font-bold text-blue-700 mb-2">{item.year} — <span className="text-purple-500">{item.highlight}</span></div>
                      <div className="text-gray-700">{item.event}</div>
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, idx) => (
              <div key={idx} className={`rounded-3xl p-10 shadow-xl border-2 border-white bg-gradient-to-br ${value.bgGradient}`}>
                <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${value.gradient} text-white`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Travel With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className={`rounded-3xl p-10 shadow-xl border-2 border-white bg-gradient-to-br ${feature.gradient} text-white`}>
                <div className="mb-6 text-4xl">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <div key={idx} className={`rounded-3xl p-8 shadow-xl border-2 border-white bg-gradient-to-br ${member.color} text-white flex flex-col items-center`}>
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-6 border-4 border-white shadow-lg object-cover" />
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <div className="mb-4 text-lg font-medium">{member.role}</div>
                <p className="text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            What Our Travelers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-10 shadow-xl border border-pink-100 flex flex-col items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mb-6 border-2 border-pink-200 object-cover" />
                <blockquote className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</blockquote>
                <div className="font-bold text-pink-600">{testimonial.name}</div>
                <div className="text-gray-500">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}