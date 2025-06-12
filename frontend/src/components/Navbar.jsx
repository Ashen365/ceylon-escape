import React, { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Destinations", href: "/destinations" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-shadow ${
          scrolled ? "shadow-lg bg-white" : "shadow-none bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            {/* Replace emoji or use an <img/> for your logo */}
            <span className="text-3xl">🌴</span>
            <span className="font-extrabold text-xl text-blue-700 tracking-tight">Ceylon Escape</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="relative px-2 py-1 font-medium text-gray-700 hover:text-blue-700 transition
                  before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-600 before:transition-all hover:before:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Hamburger menu button */}
          <button
            className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center group"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-8 h-0.5 bg-blue-700 rounded mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-8 h-0.5 bg-blue-700 rounded mb-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-8 h-0.5 bg-blue-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-[70vw] max-w-xs bg-white z-50 shadow-lg pt-24 pb-6 px-8 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg font-semibold text-gray-700 hover:text-blue-700 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-16 md:h-[64px]"></div>
    </>
  );
}