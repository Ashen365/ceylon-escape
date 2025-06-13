import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Mail, Phone, MapPin, User, MessageSquare, Send, CheckCircle } from "lucide-react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate sending the form
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  useEffect(() => {
    // Info section animation
    gsap.from(".contact-info-item", {
      x: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top 75%",
      },
    });
    
    // Form animation
    gsap.from(".form-field", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      {/* Page Title */}
      <motion.h1 
        className="text-4xl font-extrabold text-center text-ceylon-700 mb-2 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h1>
      <motion.div 
        className="flex justify-center mb-4"
        initial={{ width: 0 }}
        animate={{ width: "6rem" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="block w-24 h-1.5 rounded bg-gradient-to-r from-ceylon-400 to-ceylon-600 shadow-md"></span>
      </motion.div>
      <motion.p 
        className="text-center text-gray-600 mb-12 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Have questions about our tours? Need help planning your perfect Sri Lankan adventure?
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg border-none p-8">
            <h2 className="text-2xl font-bold text-ceylon-700 mb-6">Send us a Message</h2>
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-green-50 text-green-700 p-4 rounded-md mb-6 flex items-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Your message has been sent successfully! We'll get back to you soon.</span>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-field">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ceylon-500 focus:border-ceylon-500"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="ceylon"
                className="w-full form-field"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div 
          ref={infoRef}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg border-none p-8 mb-8">
            <h2 className="text-2xl font-bold text-ceylon-700 mb-6">Contact Information</h2>
            <ul className="space-y-6">
              <li className="contact-info-item flex items-start">
                <div className="bg-ceylon-100 rounded-full p-3 mr-4">
                  <MapPin className="h-6 w-6 text-ceylon-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Our Office</h3>
                  <p className="text-gray-600">123 Travel Street,<br/>Colombo 03,<br/>Sri Lanka</p>
                </div>
              </li>
              
              <li className="contact-info-item flex items-start">
                <div className="bg-ceylon-100 rounded-full p-3 mr-4">
                  <Mail className="h-6 w-6 text-ceylon-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Email Us</h3>
                  <p className="text-ceylon-600 hover:underline">
                    <a href="mailto:info@ceylonescape.com">info@ceylonescape.com</a>
                  </p>
                  <p className="text-ceylon-600 hover:underline">
                    <a href="mailto:bookings@ceylonescape.com">bookings@ceylonescape.com</a>
                  </p>
                </div>
              </li>
              
              <li className="contact-info-item flex items-start">
                <div className="bg-ceylon-100 rounded-full p-3 mr-4">
                  <Phone className="h-6 w-6 text-ceylon-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
                  <p className="text-gray-600">+94 11 234 5678</p>
                  <p className="text-gray-600">+94 77 123 4567 (WhatsApp)</p>
                </div>
              </li>
            </ul>
          </Card>
          
          <Card className="shadow-lg border-none p-8">
            <h2 className="text-2xl font-bold text-ceylon-700 mb-6">Operating Hours</h2>
            <ul className="space-y-3">
              <li className="flex justify-between contact-info-item">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between contact-info-item">
                <span className="text-gray-600">Saturday:</span>
                <span className="font-medium">9:00 AM - 3:00 PM</span>
              </li>
              <li className="flex justify-between contact-info-item">
                <span className="text-gray-600">Sunday:</span>
                <span className="font-medium">Closed</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}