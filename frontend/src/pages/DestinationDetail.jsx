import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import BookingForm from "../components/BookingForm";
import { useTours } from "../hooks/useTours";
import { Card } from "../components/ui/card";
import { ArrowLeft, Calendar, Star, MapPin } from "lucide-react";

// Helper to create slugs from tour titles
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/'/g, "") // remove apostrophes
    .replace(/\s+/g, "-"); // spaces to dashes
}

export default function DestinationDetail() {
  const { slug } = useParams();
  const { tours, loading, error } = useTours();

  // Loading state with animation
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

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto py-16 px-6 text-center"
      >
        <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Error Loading Tour</h2>
          <p className="mb-4">{error.message || "There was a problem loading this destination. Please try again later."}</p>
          <Link to="/destinations" className="text-ceylon-600 hover:underline font-medium">
            &larr; Browse All Destinations
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!tours) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-600 max-w-3xl mx-auto py-16 px-6 text-center"
      >
        <Card className="p-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Error Loading Tours</h2>
          <p className="mb-4">Unable to fetch destination information at this time.</p>
          <Link to="/destinations" className="text-ceylon-600 hover:underline font-medium">
            &larr; Browse All Destinations
          </Link>
        </Card>
      </motion.div>
    );
  }

  // Find the tour by slug
  const tour = tours.find((t) => slugify(t.title) === slug);

  if (!tour) {
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
        <span className="text-ceylon-600 font-medium">{tour.title}</span>
      </motion.div>
      
      {/* Hero image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-xl overflow-hidden shadow-xl mb-8"
      >
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-[40vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(tour.ratingsAverage || 4.5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">
              {tour.ratingsAverage || 4.5} ({tour.ratingsQuantity || 0} reviews)
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{tour.title}</h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Tour details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 border-none shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-ceylon-800">About This Destination</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{tour.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-3 bg-ceylon-50 rounded-lg">
                <Calendar className="h-5 w-5 text-ceylon-600 mr-3" />
                <div>
                  <div className="text-xs text-gray-500">Tour Date</div>
                  <div className="font-medium text-gray-800">
                    {new Date(tour.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-ceylon-50 rounded-lg">
                <MapPin className="h-5 w-5 text-ceylon-600 mr-3" />
                <div>
                  <div className="text-xs text-gray-500">Starting Point</div>
                  <div className="font-medium text-gray-800">Colombo, Sri Lanka</div>
                </div>
              </div>
            </div>
            
            <div className="bg-ceylon-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-ceylon-800 mb-2">What to Expect</h3>
              <p className="text-gray-700">
                Embark on a journey to experience the authentic beauty of {tour.title}. 
                This tour includes guided exploration, transportation, and amazing photo opportunities.
              </p>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <div className="text-lg font-bold text-ceylon-800">
                ${tour.price} <span className="text-sm text-gray-600 font-normal">per person</span>
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
          <BookingForm tourId={tour._id} tourName={tour.title} />
        </motion.div>
      </div>
    </div>
  );
}