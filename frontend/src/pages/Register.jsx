import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Eye,
  EyeOff,
  ArrowRight,
  CornerUpRight,
  Sparkles
} from "lucide-react";

// 3D Card effect component
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Apply springs for smooth animation
  const springConfig = { stiffness: 150, damping: 15 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Handle mouse movement
  function handleMouseMove(e) {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: isHovered ? springRotateX : 0,
          rotateY: isHovered ? springRotateY : 0,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "all 0.5s ease",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Animated Background with Particles
const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-indigo-50 to-purple-50"></div>
      
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ 
            width: Math.random() * 60 + 10, 
            height: Math.random() * 60 + 10,
            filter: "blur(8px)",
            opacity: 0.5
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-10 w-40 h-40 bg-indigo-700 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 -right-10 w-60 h-60 bg-purple-300 rounded-full filter blur-3xl opacity-30"></div>
    </div>
  );
};

// Card Spotlight Effect
const CardSpotlight = ({ children, className }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event) {
    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    }
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={style} />
      <motion.div className="relative z-10">{children}</motion.div>
    </motion.div>
  );
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const nameInputRef = useRef(null);
  
  // Motion values for interactive button
  const buttonHoverState = useMotionValue(0);
  const buttonScale = useTransform(buttonHoverState, [0, 1], [1, 1.05]);
  const buttonBgPosition = useTransform(buttonHoverState, [0, 1], ['0% 0%', '100% 0%']);

  useEffect(() => {
    // Focus on name input when component mounts
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
    
    // Add custom scrolling animation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll', scrollY / 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check password strength with enhanced logic
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Enhanced validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      shakeForm();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      shakeForm();
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      shakeForm();
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user" // Default role
      });

      if (success) {
        // Show success animation before redirecting
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      shakeForm();
    } finally {
      setIsLoading(false);
    }
  };
  
  const shakeForm = () => {
    const form = document.getElementById("register-form");
    if (form) {
      form.classList.add("animate-shake");
      setTimeout(() => form.classList.remove("animate-shake"), 500);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100, 
        damping: 12
      }
    }
  };
  
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very strong"];
  const strengthColors = [
    "from-red-500 to-red-500",
    "from-orange-500 to-orange-500",
    "from-yellow-500 to-yellow-500",
    "from-green-500 to-green-500", 
    "from-emerald-400 to-green-600"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 relative">
      <ParticlesBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center"
              style={{ minHeight: "500px" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-green-100 p-5 rounded-full mb-6"
              >
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
              <p className="text-gray-600 mb-6 max-w-sm">
                Welcome to Ceylon Escape! We're thrilled to have you join our community. 
                You'll be redirected to start your adventure.
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-full"
              />
            </motion.div>
          ) : (
            <TiltCard className="w-full">
              <CardSpotlight className="rounded-3xl overflow-hidden">
                <Card className="p-8 shadow-2xl border-none rounded-3xl bg-white/90 backdrop-blur-md overflow-hidden relative">
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full filter blur-xl opacity-50 -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100 rounded-full filter blur-xl opacity-50 -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center bg-blue-50 rounded-full px-4 py-1 mb-4"
                      >
                        <Sparkles className="h-4 w-4 mr-1 text-indigo-700" />
                        <span className="text-sm font-medium text-indigo-800">Join Ceylon Escape</span>
                      </motion.div>
                      
                      <motion.h1
                        className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-pink-800 bg-clip-text text-transparent mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        Create an Account
                      </motion.h1>
                      
                      <motion.p
                        className="text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        Begin your Sri Lankan adventure journey
                      </motion.p>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-start"
                        >
                          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-red-500" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.form
                      id="register-form"
                      onSubmit={handleSubmit}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-5"
                    >
                      <motion.div variants={itemVariants}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-5 w-5" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            ref={nameInputRef}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="pl-10 py-3 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/80 backdrop-blur-sm"
                            autoComplete="name"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-5 w-5" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="pl-10 py-3 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/80 backdrop-blur-sm"
                            autoComplete="email"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-5 w-5" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="pl-10 pr-10 py-3 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/80 backdrop-blur-sm"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        {/* Enhanced password strength indicator */}
                        <AnimatePresence>
                          {formData.password && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${passwordStrength * 25}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`h-full rounded-full bg-gradient-to-r ${strengthColors[passwordStrength]}`}
                                  />
                                </div>
                                <span className="text-sm whitespace-nowrap">
                                  {strengthLabels[passwordStrength]}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-1">
                                <motion.div 
                                  className="flex items-center text-xs"
                                  animate={{ 
                                    color: formData.password.length >= 8 ? "#10b981" : "#6b7280"
                                  }}
                                >
                                  <motion.div 
                                    initial={{ scale: 0.8 }}
                                    animate={{ 
                                      scale: formData.password.length >= 8 ? 1 : 0.8,
                                      backgroundColor: formData.password.length >= 8 ? "#d1fae5" : "transparent" 
                                    }}
                                    className="flex items-center justify-center mr-1.5 w-4 h-4 rounded-full"
                                  >
                                    <CheckCircle2 className={`h-3 w-3 ${formData.password.length >= 8 ? "opacity-100 text-green-600" : "opacity-50 text-gray-400"}`} />
                                  </motion.div>
                                  At least 8 characters
                                </motion.div>
                                
                                <motion.div 
                                  className="flex items-center text-xs"
                                  animate={{ 
                                    color: /[A-Z]/.test(formData.password) ? "#10b981" : "#6b7280"
                                  }}
                                >
                                  <motion.div 
                                    initial={{ scale: 0.8 }}
                                    animate={{ 
                                      scale: /[A-Z]/.test(formData.password) ? 1 : 0.8,
                                      backgroundColor: /[A-Z]/.test(formData.password) ? "#d1fae5" : "transparent" 
                                    }}
                                    className="flex items-center justify-center mr-1.5 w-4 h-4 rounded-full"
                                  >
                                    <CheckCircle2 className={`h-3 w-3 ${/[A-Z]/.test(formData.password) ? "opacity-100 text-green-600" : "opacity-50 text-gray-400"}`} />
                                  </motion.div>
                                  Uppercase letter
                                </motion.div>
                                
                                <motion.div 
                                  className="flex items-center text-xs"
                                  animate={{ 
                                    color: /[0-9]/.test(formData.password) ? "#10b981" : "#6b7280"
                                  }}
                                >
                                  <motion.div 
                                    initial={{ scale: 0.8 }}
                                    animate={{ 
                                      scale: /[0-9]/.test(formData.password) ? 1 : 0.8,
                                      backgroundColor: /[0-9]/.test(formData.password) ? "#d1fae5" : "transparent" 
                                    }}
                                    className="flex items-center justify-center mr-1.5 w-4 h-4 rounded-full"
                                  >
                                    <CheckCircle2 className={`h-3 w-3 ${/[0-9]/.test(formData.password) ? "opacity-100 text-green-600" : "opacity-50 text-gray-400"}`} />
                                  </motion.div>
                                  Number
                                </motion.div>
                                
                                <motion.div 
                                  className="flex items-center text-xs"
                                  animate={{ 
                                    color: /[^A-Za-z0-9]/.test(formData.password) ? "#10b981" : "#6b7280"
                                  }}
                                >
                                  <motion.div 
                                    initial={{ scale: 0.8 }}
                                    animate={{ 
                                      scale: /[^A-Za-z0-9]/.test(formData.password) ? 1 : 0.8,
                                      backgroundColor: /[^A-Za-z0-9]/.test(formData.password) ? "#d1fae5" : "transparent" 
                                    }}
                                    className="flex items-center justify-center mr-1.5 w-4 h-4 rounded-full"
                                  >
                                    <CheckCircle2 className={`h-3 w-3 ${/[^A-Za-z0-9]/.test(formData.password) ? "opacity-100 text-green-600" : "opacity-50 text-gray-400"}`} />
                                  </motion.div>
                                  Special character
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-5 w-5" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="pl-10 pr-10 py-3 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/80 backdrop-blur-sm"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        
                        {/* Password match indicator */}
                        {formData.password && formData.confirmPassword && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 flex items-center"
                          >
                            {formData.password === formData.confirmPassword ? (
                              <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="flex items-center text-green-600 text-sm"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Passwords match
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="flex items-center text-red-600 text-sm"
                              >
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Passwords don't match
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-indigo-800 to-pink-800 text-white font-bold py-3 px-6 rounded-xl transition-all overflow-hidden relative"
                          style={{ 
                            scale: buttonScale,
                            backgroundPosition: buttonBgPosition
                          }}
                          onHoverStart={() => buttonHoverState.set(1)}
                          onHoverEnd={() => buttonHoverState.set(0)}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating account...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <UserPlus className="mr-2 h-5 w-5" />
                              Sign Up
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                className="absolute right-4"
                              >
                                <ArrowRight className="h-5 w-5" />
                              </motion.div>
                            </div>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.form>

                    <motion.div
                      className="mt-8 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <p className="text-gray-600 flex items-center justify-center">
                        Already have an account?{" "}
                        <motion.div
                          whileHover={{ scale: 1.05, x: 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="inline-flex items-center ml-1"
                        >
                          <Link to="/login" className="text-indigo-800 hover:text-indigo-900 font-medium flex items-center">
                            Log in
                            <CornerUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </motion.div>
                      </p>
                    </motion.div>
                    
                    {/* Social sign-up options */}
                    <motion.div
                      className="mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-3 gap-3">
                        {[
                          { name: "Google", icon: "https://www.svgrepo.com/show/355037/google.svg" },
                          { name: "Facebook", icon: "https://www.svgrepo.com/show/475647/facebook-color.svg" },
                          { name: "Apple", icon: "https://www.svgrepo.com/show/452223/apple.svg" }
                        ].map((provider, i) => (
                          <motion.button
                            key={provider.name}
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 flex justify-center items-center"
                            whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 + (i * 0.1), duration: 0.5 }}
                          >
                            <img src={provider.icon} alt={provider.name} className="h-5 w-5" />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* CSS for the shake animation */}
                  <style jsx>{`
                    @keyframes shake {
                      0%, 100% { transform: translateX(0); }
                      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                      20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                    .animate-shake {
                      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                    }
                  `}</style>
                </Card>
              </CardSpotlight>
            </TiltCard>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}