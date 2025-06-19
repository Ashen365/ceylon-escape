import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { ArrowLeft, Calendar, Star, MapPin, Clock, Compass } from "lucide-react";
import { destinations } from "../data/destination";

// Simple BookingForm Component (if you don't have one already)
const BookingForm = ({ destination, image }) => {
  const [formData, setFormData] = useState({
    date: "",
    guests: 2,
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking form submitted! This is a demo.");
  };

  return (
    <Card className="p-6 shadow-lg border-none">
      <h3 className="text-xl font-bold mb-4">Book Your Trip</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Guests</label>
          <select 
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium"
        >
          Book Now
        </button>
      </form>
    </Card>
  );
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Find destination by slug
  const destination = destinations.find(d => d.slug === slug);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-[60vh] text-ceylon-700"
      >
        <div className="text-center">
          <div className="animate-spin mb-4 h-12 w-12 border-4 border-t-ceylon-600 border-ceylon-200 rounded-full mx-auto"></div>
          <p className="text-xl font-medium">Loading destination details...</p>
        </div>
      </motion.div>
    );
  }

  if (!destination) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto py-16 px-6 text-center"
      >
        <Card className="p-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-ceylon-700">Destination Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the destination you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          <Link to="/destinations" className="text-ceylon-600 hover:underline font-medium flex items-center justify-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Browse All Destinations
          </Link>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-sm text-gray-500 mb-6"
      >
        <Link to="/" className="hover:text-ceylon-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/destinations" className="hover:text-ceylon-600">Destinations</Link>
        <span className="mx-2">/</span>
        <span className="text-ceylon-600 font-medium">{destination.name}</span>
      </motion.div>
      
      {/* Hero image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-xl overflow-hidden shadow-xl mb-8"
      >
        <img
          src={destination.img}
          alt={destination.name}
          className="w-full h-[40vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < 4.5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">
              4.5 (24 reviews)
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{destination.name}</h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Destination details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 border-none shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-ceylon-800">About This Destination</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{destination.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-3 bg-ceylon-50 rounded-lg">
                <Clock className="h-5 w-5 text-ceylon-600 mr-3" />
                <div>
                  <div className="text-xs text-gray-500">Recommended Stay</div>
                  <div className="font-medium text-gray-800">{destination.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-ceylon-50 rounded-lg">
                <Calendar className="h-5 w-5 text-ceylon-600 mr-3" />
                <div>
                  <div className="text-xs text-gray-500">Best Time to Visit</div>
                  <div className="font-medium text-gray-800">{destination.bestSeason}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-ceylon-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-ceylon-800 mb-2">Highlights</h3>
              <ul className="space-y-2">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-ceylon-100 p-1 rounded-full mr-2 mt-1">
                      <Compass className="w-3 h-3 text-ceylon-700" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <div className="text-lg font-bold text-ceylon-800">
                Getting There
              </div>
              <Link to="/destinations" className="text-ceylon-600 hover:underline flex items-center">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Destinations
              </Link>
            </div>
          </Card>
        </motion.div>
        
        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <BookingForm 
            destination={destination.name} 
            image={destination.img} 
          />
        </motion.div>
      </div>
    </div>
  );
}