import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { 
  Menu, User, LogOut, LogIn, UserPlus, 
  ChevronDown, Search 
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Destinations", href: "/destinations" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // GSAP animation for navbar items
  useEffect(() => {
    if (!menuOpen) return;
    
    const tl = gsap.timeline();
    tl.from(".mobile-nav-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
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
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    return () => gsap.killTweensOf(".nav-link.active");
  }, [location.pathname]);

  // Animate shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      {/* Fixed navbar */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg bg-white/95 backdrop-blur-sm" : "shadow-none bg-white"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* Logo animation */}
            <motion.span 
              className="text-3xl"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              🌴
            </motion.span>
            <motion.span 
              className="font-extrabold text-xl text-ceylon-600 tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ceylon Escape
            </motion.span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={handleLinkClick}
                className={`nav-link relative px-2 py-1 font-medium text-gray-700 hover:text-ceylon-700 transition
                  before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-ceylon-600 before:transition-all hover:before:w-full
                  ${location.pathname === link.href ? 'active text-ceylon-700 before:w-full' : ''}
                `}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Search button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-ceylon-700"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {/* Authentication buttons */}
            {isAuthenticated ? (
              <div className="relative group">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2"
                >
                  <User size={18} />
                  {user?.name?.split(' ')[0] || 'Account'}
                  <ChevronDown size={16} />
                </Button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 origin-top-right transition-all duration-200 invisible group-hover:visible">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Bookings
                  </Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <LogIn size={18} />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="ceylon" className="flex items-center gap-2">
                    <UserPlus size={18} />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger menu button */}
          <button
            className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.div 
              className="w-8 h-0.5 bg-ceylon-700 rounded mb-1.5"
              animate={{ 
                rotate: menuOpen ? 45 : 0,
                translateY: menuOpen ? 2 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-8 h-0.5 bg-ceylon-700 rounded mb-1.5"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-8 h-0.5 bg-ceylon-700 rounded"
              animate={{ 
                rotate: menuOpen ? -45 : 0,
                translateY: menuOpen ? -2 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden fixed top-0 right-0 h-full w-[70vw] max-w-xs bg-white z-50 shadow-lg pt-24 pb-6 px-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={handleLinkClick}
                    className="mobile-nav-item text-lg font-semibold text-gray-700 hover:text-ceylon-700 transition"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile auth buttons */}
                <div className="pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" className="mobile-nav-item block py-2 text-ceylon-700 font-medium">
                        Dashboard
                      </Link>
                      <Link to="/profile" className="mobile-nav-item block py-2 text-gray-700">
                        Profile
                      </Link>
                      <Link to="/bookings" className="mobile-nav-item block py-2 text-gray-700">
                        My Bookings
                      </Link>
                      <button 
                        onClick={logout} 
                        className="mobile-nav-item flex items-center gap-2 mt-2 text-red-600"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-4 mt-2">
                      <Link to="/login" className="mobile-nav-item">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                          <LogIn size={18} />
                          Login
                        </Button>
                      </Link>
                      <Link to="/register" className="mobile-nav-item">
                        <Button variant="ceylon" className="w-full flex items-center justify-center gap-2">
                          <UserPlus size={18} />
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
            >
              <motion.div 
                className="w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-2xl mx-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center border-b p-4">
                  <Search className="text-gray-400 mr-3" />
                  <input 
                    type="search" 
                    placeholder="Search for destinations..." 
                    className="w-full outline-none text-lg"
                    autoFocus
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Popular searches: Ella, Sigiriya, Kandy, Beach</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-16 md:h-[64px]"></div>
    </>
  );
}