import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useAnimation, useMotionTemplate, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Sparkles,
  ArrowRight
} from "lucide-react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// 3D card hover effect
const CardSpotlight = ({ children, className }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = React.useCallback(
    ({ clientX, clientY, currentTarget }) => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={style} />
      <div className="relative pointer-events-none">{children}</div>
    </div>
  );
};

// Animated floating decorative elements
const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <div
    className={`absolute animate-float ${className}`}
    style={{
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
    `}</style>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hover, setHover] = useState(false);
  
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const pageRef = useRef(null);
  
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px 0px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px 0px" });
  const isMapInView = useInView(mapRef, { once: true, margin: "-100px 0px" });
  
  const formControls = useAnimation();
  const infoControls = useAnimation();
  const mapControls = useAnimation();

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
    if (isInfoInView) {
      infoControls.start("visible");
    }
    
    if (isFormInView) {
      formControls.start("visible");
    }
    
    if (isMapInView) {
      mapControls.start("visible");
    }
    
    // Create a parallax effect for the background
    gsap.to(".parallax-bg", {
      y: (i, el) => -ScrollTrigger.maxScroll(window) * el.dataset.speed,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    
    // Info section animation with GSAP
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
    
    // Form animation with GSAP
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
  }, [infoControls, formControls, mapControls, isInfoInView, isFormInView, isMapInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };
  
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const pathVariant = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-pink-200 via-white to-indigo-50 overflow-hidden" ref={pageRef}>
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20">
        <div className="parallax-bg absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-200 filter blur-3xl" data-speed="0.2"></div>
        <div className="parallax-bg absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-purple-200 filter blur-3xl" data-speed="0.1"></div>
        <div className="parallax-bg absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-pink-200 filter blur-3xl" data-speed="0.15"></div>
      </div>
      
      {/* Floating decorative elements */}
      <FloatingElement delay={0} className="top-20 left-[10%] text-6xl opacity-10">✉️</FloatingElement>
      <FloatingElement delay={2} className="top-40 right-[15%] text-4xl opacity-10">📞</FloatingElement>
      <FloatingElement delay={3} className="bottom-[20%] left-[20%] text-5xl opacity-10">📍</FloatingElement>
      <FloatingElement delay={1.5} className="bottom-[30%] right-[10%] text-5xl opacity-10">💬</FloatingElement>
      
      <div className="max-w-6xl mx-auto py-24 px-6 relative">
        {/* Page Title */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-md"
          >
            <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
            <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Get in Touch
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-center mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-pink-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Contact Us
          </motion.h1>
          
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="block w-24 h-1.5 rounded bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 shadow-md"></span>
          </motion.div>
          
          <motion.p 
            className="text-center text-gray-600 mb-8 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Have questions about our tours? Need help planning your perfect Sri Lankan adventure? 
            Our team is ready to assist you every step of the way.
          </motion.p>
          
          {/* Social media links */}
          <motion.div 
            className="flex justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: <Instagram className="w-5 h-5" />, color: 'bg-gradient-to-br from-purple-600 to-pink-500' },
              { icon: <Facebook className="w-5 h-5" />, color: 'bg-blue-600' },
              { icon: <Twitter className="w-5 h-5" />, color: 'bg-blue-400' },
              { icon: <Linkedin className="w-5 h-5" />, color: 'bg-blue-700' }
            ].map((item, i) => (
              <motion.a
                key={i}
                href="#"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${item.color} p-3 rounded-full text-white shadow-md hover:shadow-lg transition-shadow`}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16bg-gradient-to-r from-indigo-700 to-pink-700">
          {/* Contact Form - 3 columns */}
          <motion.div
            ref={formRef}
            className="md:col-span-3"
            variants={fadeInUpVariant}
            initial="hidden"
            animate={formControls}
          >
            <CardSpotlight className="rounded-3xl overflow-hidden">
              <Card className="shadow-xl border-none p-8 md:p-10 bg-white/80 backdrop-blur-md rounded-3xl relative overflow-hidden h-full">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 mb-6">
                    Send us a Message
                  </h2>
                  
                  <AnimatePresence>
                    {success && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 flex items-center"
                      >
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                        <span>Your message has been sent successfully! We'll get back to you soon.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div 
                      className="form-field"
                      variants={itemVariants}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-xl"
                          required
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="form-field"
                      variants={itemVariants}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-xl"
                          required
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="form-field"
                      variants={itemVariants}
                    >
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
                        className="border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-xl"
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="form-field"
                      variants={itemVariants}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-indigo-400 h-5 w-5" />
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us what you're looking for..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      variants={itemVariants}
                      className="form-field"
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:transform-none"
                        disabled={isLoading}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                            <motion.div
                              initial={{ width: 0, x: 0, opacity: 0 }}
                              animate={hover ? { width: "auto", x: 5, opacity: 1 } : { width: 0, x: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ArrowRight className="ml-1 h-5 w-5" />
                            </motion.div>
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </Card>
            </CardSpotlight>
          </motion.div>
          
          {/* Contact Info - 2 columns */}
          <motion.div 
            ref={infoRef}
            className="md:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={infoControls}
          >
            <CardSpotlight className="rounded-3xl overflow-hidden mb-8">
              <Card className="shadow-xl border-none p-8 bg-white/80 backdrop-blur-md rounded-3xl relative h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full filter blur-2xl opacity-40 -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full filter blur-2xl opacity-40 -ml-10 -mb-10"></div>
                
                <div className="relative">
                  <motion.h2 
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 mb-6"
                    variants={itemVariants}
                  >
                    Contact Information
                  </motion.h2>
                  
                  <ul className="space-y-6">
                    <motion.li className="contact-info-item flex items-start" variants={itemVariants}>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-3 mr-4 shadow-sm">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <MapPin className="h-6 w-6 text-indigo-600" />
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Our Office</h3>
                        <p className="text-gray-600">123 Travel Street,<br/>Colombo 03,<br/>Sri Lanka</p>
                      </div>
                    </motion.li>
                    
                    <motion.li className="contact-info-item flex items-start" variants={itemVariants}>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-3 mr-4 shadow-sm">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Mail className="h-6 w-6 text-indigo-600" />
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Email Us</h3>
                        <motion.p 
                          className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <a href="mailto:info@ceylonescape.com">info@ceylonescape.com</a>
                        </motion.p>
                        <motion.p 
                          className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <a href="mailto:bookings@ceylonescape.com">bookings@ceylonescape.com</a>
                        </motion.p>
                      </div>
                    </motion.li>
                    
                    <motion.li className="contact-info-item flex items-start" variants={itemVariants}>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-3 mr-4 shadow-sm">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <Phone className="h-6 w-6 text-indigo-600" />
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
                        <p className="text-gray-600">+94 11 234 5678</p>
                        <p className="text-gray-600">+94 77 123 4567 (WhatsApp)</p>
                      </div>
                    </motion.li>
                  </ul>
                </div>
              </Card>
            </CardSpotlight>
            
            <CardSpotlight className="rounded-3xl overflow-hidden">
              <Card className="shadow-xl border-none p-8 bg-white/80 backdrop-blur-md rounded-3xl">
                <motion.h2 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 mb-6"
                  variants={itemVariants}
                >
                  Operating Hours
                </motion.h2>
                
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-center justify-between contact-info-item"
                    variants={itemVariants}
                  >
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                      <span className="text-gray-600">Monday - Friday:</span>
                    </div>
                    <span className="font-medium bg-gradient-to-r from-indigo-700 to-pink-700 text-transparent bg-clip-text">9:00 AM - 6:00 PM</span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-center justify-between contact-info-item"
                    variants={itemVariants}
                  >
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-indigo-700" />
                      <span className="text-gray-600">Saturday:</span>
                    </div>
                    <span className="font-medium bg-gradient-to-r from-indigo-700 to-pink-700 text-transparent bg-clip-text">9:00 AM - 3:00 PM</span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-center justify-between contact-info-item"
                    variants={itemVariants}
                  >
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                      <span className="text-gray-600">Sunday:</span>
                    </div>
                    <span className="font-medium">Closed</span>
                  </motion.li>
                </ul>
              </Card>
            </CardSpotlight>
          </motion.div>
        </div>
        
        {/* Map Section */}
        <motion.div
          ref={mapRef}
          variants={fadeInUpVariant}
          initial="hidden"
          animate={mapControls}
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="relative h-[400px] w-full">
            {/* Map embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385596985!2d79.8251715!3d6.921837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1623825894746!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-3xl"
            ></iframe>
            
            {/* Animated pin */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.6,
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="p-2 bg-gradient-to-r from-indigo-700 to-pink-700 rounded-full shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-indigo-900 rotate-45"></div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* FAQ or Additional Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 mb-6"
            variants={itemVariants}
          >
            Need Immediate Help?
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Our customer service team is available via live chat on our website or through WhatsApp for urgent inquiries.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              WhatsApp Chat
            </Button>
            <Button className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-8 py-3 rounded-xl shadow flex items-center gap-2 border border-indigo-100">
              <MessageSquare className="h-5 w-5" />
              Live Chat
            </Button>
          </motion.div>
        </motion.div>
        
        {/* SVG wave design at bottom */}
        <div className="absolute left-0 right-0 bottom-0 transform translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <motion.path
              fill="rgba(224, 231, 255, 0.5)"
              fillOpacity="1"
              d="M0,32L48,53.3C96,75,192,117,288,122.7C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              variants={pathVariant}
              initial="hidden"
              animate="visible"
            ></motion.path>
          </svg>
        </div>
      </div>
    </div>
  );
}