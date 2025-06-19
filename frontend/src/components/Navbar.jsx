import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { 
  Menu, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronDown, 
  Search, 
  Home, 
  Info, 
  Map, 
  MessageSquare,
  Sun, 
  Moon, 
  Heart, 
  Bell, 
  Settings, 
  Sparkles, 
  ShoppingBag,
  Compass, 
  Calendar, 
  BookOpen, 
  Bookmark, 
  Coffee, 
  Plane,
  ArrowRight
} from "lucide-react";

// Get system preference for dark mode
const getSystemThemePreference = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Navigation links with icons
const navLinks = [
  { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
  { name: "About", href: "/about", icon: <Info className="w-5 h-5" /> },
  { name: "Destinations", href: "/destinations", icon: <Compass className="w-5 h-5" /> },
  { name: "Contact", href: "/contact", icon: <MessageSquare className="w-5 h-5" /> },
];

// Lottie-like Palm Tree Animation Component
const PalmTreeAnimation = () => {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const animatePalm = () => {
      gsap.to(ref.current.querySelector(".palm-leaf-1"), {
        rotation: hover ? 10 : 0,
        transformOrigin: "bottom center",
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
      });
      
      gsap.to(ref.current.querySelector(".palm-leaf-2"), {
        rotation: hover ? -8 : 0,
        transformOrigin: "bottom center",
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };
    
    animatePalm();
  }, [hover]);
  
  return (
    <div 
      ref={ref}
      className="w-8 h-8 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Tree trunk */}
        <motion.path 
          d="M32 55C32 55 30 40 28 35C26 30 26 25 28 20" 
          stroke="#8B572A" 
          strokeWidth="4" 
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Palm leaves */}
        <motion.path 
          className="palm-leaf-1"
          d="M28 20C28 20 45 15 50 25C55 35 35 30 28 20Z" 
          fill="#4ade80" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.path 
          className="palm-leaf-2"
          d="M28 20C28 20 10 15 6 25C2 35 20 30 28 20Z" 
          fill="#4ade80" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        
        {/* Base */}
        <motion.ellipse 
          cx="30" 
          cy="55" 
          rx="6" 
          ry="2" 
          fill="#8B572A" 
          opacity="0.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        />
      </svg>
      
      {/* Sparkle effect when hovered */}
      <AnimatePresence>
        {hover && (
          <>
            <motion.div 
              className="absolute -top-1 -right-1 text-yellow-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✨
            </motion.div>
            <motion.div 
              className="absolute -bottom-1 -left-1 text-yellow-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              ✨
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Notification Badge Component
const NotificationBadge = ({ count }) => {
  return count > 0 ? (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
    >
      {count}
    </motion.div>
  ) : null;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notificationCount, setNotificationCount] = useState(3);
  const [recents, setRecents] = useState([
    { id: 1, name: "Ella", type: "destination" },
    { id: 2, name: "Beach Safari", type: "tour" },
  ]);
  
  // Theme state management - improved
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    // If no saved preference, use system default
    return savedTheme || getSystemThemePreference();
  });
  
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const searchInputRef = useRef(null);
  
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navBackgroundBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(8px)"]);
  const springNavShadow = useSpring(
    useTransform(scrollY, [0, 100], [0, 0.15]), 
    { stiffness: 300, damping: 30 }
  );

  // Apply theme changes when theme state changes
  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply the theme to the document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Optional: Apply additional theme-specific styles
    const body = document.body;
    if (theme === 'dark') {
      body.style.backgroundColor = '#1a1a1a';
      body.style.color = '#f3f4f6';
    } else {
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#111827';
    }
  }, [theme]);

  // GSAP animation for navbar items
  useEffect(() => {
    if (!menuOpen) return;
    
    const tl = gsap.timeline();
    tl.from(".mobile-nav-item", {
      opacity: 0,
      x: -20,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    });
    
    return () => tl.kill();
  }, [menuOpen]);

  // Highlight active link with animation
  useEffect(() => {
    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) {
      gsap.to(activeLink, {
        fontWeight: 600,
        color: "#4F46E5",
        ease: "power2.out"
      });
    }
    return () => gsap.killTweensOf(".nav-link.active");
  }, [location.pathname]);

  // Animate shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  const handleLinkClick = () => setMenuOpen(false);
  
  // Handle search query changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Mock search results
    if (query.length > 1) {
      setSearchResults([
        { id: 1, name: "Ella Rock", type: "destination", icon: <Map className="w-4 h-4 text-indigo-500" /> },
        { id: 2, name: "Elephant Safari", type: "experience", icon: <Calendar className="w-4 h-4 text-green-500" /> },
        { id: 3, name: "Ceylon Tea Tour", type: "tour", icon: <Coffee className="w-4 h-4 text-amber-500" /> },
      ]);
    } else {
      setSearchResults([]);
    }
  };
  
  // Handle theme toggle - improved
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // User menu items
  const userMenuItems = [
    { name: "Dashboard", icon: <Home className="w-4 h-4" />, href: "/dashboard" },
    { name: "My Bookings", icon: <BookOpen className="w-4 h-4" />, href: "/bookings" },
    { name: "Wishlist", icon: <Heart className="w-4 h-4" />, href: "/wishlist" },
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
    { name: "Settings", icon: <Settings className="w-4 h-4" />, href: "/settings" }
  ];
  
  // Determine text and background colors based on theme
  const navbarBgColor = theme === 'dark' 
    ? scrolled ? 'rgba(17, 24, 39, 0.9)' : 'rgb(17, 24, 39)' 
    : scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgb(255, 255, 255)';
  
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-700';
  const accentTextColor = theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600';
  const hoverBgColor = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  
  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Only update theme based on system if user hasn't set a preference
    const handleChange = () => {
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      {/* Fixed navbar */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          theme === 'dark' ? 'dark' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          opacity: navOpacity,
        }}
        style={{ 
          boxShadow: scrolled ? `0px 5px 15px rgba(0, 0, 0, ${springNavShadow.get() * (theme === 'dark' ? 0.5 : 0.15)})` : "none",
          backdropFilter: navBackgroundBlur,
          backgroundColor: navbarBgColor,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* Logo with animated palm tree */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <PalmTreeAnimation />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                className={`font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r ${
                  theme === 'dark' 
                    ? 'from-indigo-400 to-purple-400' 
                    : 'from-indigo-600 to-violet-500'
                } text-transparent bg-clip-text`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Ceylon Escape
              </motion.span>
              <motion.span
                className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} -mt-1`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Adventure Awaits
              </motion.span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to={link.href}
                    onClick={handleLinkClick}
                    className={`nav-link relative px-3 py-2 rounded-full font-medium flex items-center gap-1.5 transition-all
                      ${location.pathname === link.href 
                        ? `active ${theme === 'dark' ? 'bg-gray-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}` 
                        : `${textColor} ${hoverBgColor} ${theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}
                    `}
                  >
                    <span className="opacity-80">{link.icon}</span>
                    {link.name}
                    
                    {/* Active indicator */}
                    {location.pathname === link.href && (
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'} mx-auto rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Divider */}
            <div className={`h-6 w-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} mx-2`}></div>
            
            {/* Desktop actions */}
            <div className="flex items-center space-x-1">
              {/* Search button */}
              <motion.button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`relative p-2.5 ${textColor} ${theme === 'dark' ? 'hover:text-indigo-400 hover:bg-gray-800' : 'hover:text-indigo-600 hover:bg-gray-50'} rounded-full`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Search size={20} />
                <motion.div 
                  className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full z-[-1]`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
              
              {/* Theme toggle button */}
              <motion.button 
                onClick={toggleTheme}
                className={`relative p-2.5 ${textColor} ${theme === 'dark' ? 'hover:text-indigo-400 hover:bg-gray-800' : 'hover:text-indigo-600 hover:bg-gray-50'} rounded-full`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 10, 0] }}
                transition={{ delay: 0.7 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "light" ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -30 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -30 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div 
                  className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full z-[-1]`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
              
              {/* Rest of the buttons... */}
              {/* (Notifications bell and other buttons - with updated theme styles) */}
              {/* ... */}
              
              {/* Authentication buttons */}
              {isAuthenticated ? (
                <motion.div 
                  className="relative group z-50"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Button 
                    variant={theme === 'dark' ? "outline" : "ghost"} 
                    className={`flex items-center gap-2 group ${theme === 'dark' 
                      ? 'hover:bg-gray-800 border-gray-700 text-gray-300'
                      : 'hover:bg-indigo-50 border-transparent group-hover:border-indigo-100'
                    } px-4 rounded-full border group-hover:border-opacity-70`}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                      {user?.name?.[0] || 'A'}
                    </div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{user?.name?.split(' ')[0] || 'Account'}</span>
                    <ChevronDown size={16} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} transition-transform duration-300 group-hover:rotate-180`} />
                  </Button>
                  
                  {/* Enhanced dropdown menu with theme styling */}
                  <div className={`absolute right-0 mt-2 w-64 ${theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800 shadow-lg shadow-black/40'
                    : 'bg-white border-gray-200 shadow-xl'
                  } rounded-xl overflow-hidden z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 origin-top-right transition-all duration-200 pointer-events-none group-hover:pointer-events-auto border`}>
                    {/* Dropdown menu content with dark theme support... */}
                    {/* ... */}
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link to="/login">
                      <Button 
                        variant={theme === 'dark' ? "outline" : "ghost"} 
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                          theme === 'dark' 
                            ? 'hover:bg-gray-800 border-gray-700 text-gray-300' 
                            : 'hover:bg-indigo-50 hover:text-indigo-600 text-gray-700'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <LogIn size={18} />
                        Login
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Link to="/register">
                      <Button 
                        className={`flex items-center gap-2 px-4 py-2 ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-indigo-500 to-violet-500'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600'
                        } text-white rounded-full hover:shadow-lg ${
                          theme === 'dark' ? 'hover:shadow-indigo-900/30' : 'hover:shadow-indigo-200'
                        } transition-shadow`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <UserPlus size={18} />
                        Sign Up
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger menu button */}
          <motion.button
            className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <motion.div 
              className={`w-6 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'} rounded mb-1.5`}
              animate={{ 
                rotate: menuOpen ? 45 : 0,
                translateY: menuOpen ? 2 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className={`w-6 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'} rounded mb-1.5`}
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className={`w-6 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'} rounded`}
              animate={{ 
                rotate: menuOpen ? -45 : 0,
                translateY: menuOpen ? -2 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Mobile menu overlay and panel with theme support */}
        {/* ... rest of the component with theme conditional classes */}
      </motion.nav>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-16 md:h-[64px]"></div>

      {/* Add tailwind dark mode classes to document */}
      <style jsx global>{`
        /* Add Tailwind dark mode styles */
        .dark {
          color-scheme: dark;
        }
        
        .dark body {
          background-color: #1a1a1a;
          color: #f3f4f6;
        }
        
        /* You can add more custom dark mode styles here */
      `}</style>
    </>
  );
}