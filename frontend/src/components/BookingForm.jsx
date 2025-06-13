import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Calendar, Mail, User, Check, AlertCircle } from "lucide-react";

export default function BookingForm({ tourId, tourName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setSuccess(false);
    
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        name: form.name,
        email: form.email,
        bookingDate: form.date,
        tour: tourId, // Send the tour ID for the backend
      });
      
      setSuccess(true);
      setStatus("Booking successful! We'll contact you soon.");
      setForm({ name: "", email: "", date: "" });
    } catch (err) {
      setSuccess(false);
      setStatus(
        err.response?.data?.message ||
          "Booking failed. Please check your information and try again."
      );
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 shadow-xl border-none bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-ceylon-800 mb-2">
            Book Your {tourName} Adventure
          </h2>
          <p className="text-gray-600">
            Fill in your details below to secure your spot
          </p>
        </div>
        
        {status && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`${
              success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            } p-4 rounded-md mb-6 flex items-start`}
          >
            {success ? (
              <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            )}
            <span>{status}</span>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Travel Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            variant="ceylon"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                Book {tourName}
              </div>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}