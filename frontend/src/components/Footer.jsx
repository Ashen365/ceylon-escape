import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ceylon-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <motion.div 
              className="flex items-center mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-3xl mr-2">🌴</span>
              <span className="font-extrabold text-xl tracking-tight">Ceylon Escape</span>
            </motion.div>
            <p className="text-ceylon-100 mb-6">
              Your gateway to Sri Lanka's wonders. Discover curated experiences and unique adventures.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-ceylon-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-ceylon-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-ceylon-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-ceylon-100 hover:text-ceylon-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-ceylon-100 hover:text-ceylon-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-ceylon-100 hover:text-ceylon-300 transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/contact" className="text-ceylon-100 hover:text-ceylon-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-ceylon-100 hover:text-ceylon-300 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-ceylon-100 hover:text-ceylon-300 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-ceylon-100 hover:text-ceylon-300 transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-ceylon-300" />
                <span className="text-ceylon-100">123 Travel Street, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-ceylon-300" />
                <span className="text-ceylon-100">+94 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-ceylon-300" />
                <span className="text-ceylon-100">info@ceylonescape.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ceylon-700 text-center text-sm">
          <p className="text-ceylon-300">
            &copy; {currentYear} Ceylon Escape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}