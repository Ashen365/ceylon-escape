import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { 
  LogIn, 
  Mail, 
  Lock, 
  AlertCircle, 
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";

// Animated background gradient with moving particles
const AnimatedBackground = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"></div>
      
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-80"
          style={{ 
            width: Math.random() * 40 + 10, 
            height: Math.random() * 40 + 10,
            filter: "blur(8px)"
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 60 + 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// 3D Card effect
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  // Apply springs for smooth animation
  const springConfig = { stiffness: 200, damping: 20 };
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
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: isHovered ? springRotateX : 0,
          rotateY: isHovered ? springRotateY : 0,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "transform 0.5s ease",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberedEmail, setRememberedEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailInputRef = useRef(null);
  
  const buttonHoverState = useMotionValue(0);
  const buttonScale = useTransform(buttonHoverState, [0, 1], [1, 1.05]);
  const buttonBgPosition = useTransform(buttonHoverState, [0, 1], ['0% 0%', '100% 0%']);
  
  useEffect(() => {
    // Check for remembered email in local storage
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberedEmail(savedEmail);
      setRememberMe(true);
    }
    
    // Focus on email input on load, unless there's a saved email
    if (emailInputRef.current && !savedEmail) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    
    try {
      // Save email to local storage if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      const success = await login(email, password);
      if (success) {
        // Show success animation before redirecting
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      // Animated shake effect for the form
      const form = document.getElementById("login-form");
      if (form) {
        form.classList.add("animate-shake");
        setTimeout(() => form.classList.remove("animate-shake"), 500);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 relative">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <AnimatePresence>
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center"
              style={{ minHeight: "400px" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-green-100 p-4 rounded-full mb-4"
              >
                <CheckCircle className="h-16 w-16 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h2>
              <p className="text-gray-600 mb-4">Redirecting you to the dashboard...</p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-green-500 rounded-full"
              />
            </motion.div>
          ) : (
            <TiltCard className="w-full">
              <Card className="p-8 shadow-2xl border-none rounded-3xl bg-white/80 backdrop-blur-md overflow-hidden relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full filter blur-2xl opacity-60 -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 rounded-full filter blur-2xl opacity-60 -ml-10 -mb-10"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center bg-blue-50 rounded-full px-4 py-1 mb-4"
                    >
                      <Sparkles className="h-4 w-4 mr-1 text-blue-600" />
                      <span className="text-sm font-medium text-indigo-700">Ceylon Escape</span>
                    </motion.div>
                    
                    <motion.h1 
                      className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-pink-700 bg-clip-text text-transparent mb-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      Welcome Back
                    </motion.h1>
                    
                    <motion.p 
                      className="text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Log in to your account to manage your bookings
                    </motion.p>
                  </div>
                  
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-start"
                      >
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.form 
                    id="login-form"
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3
                        }
                      }
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                        <Input
                          id="email"
                          type="email"
                          ref={emailInputRef}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="pl-10 py-3 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 bg-white/80"
                          autoComplete="email"
                        />
                        {email && email === rememberedEmail && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link 
                            to="/forgot-password" 
                            className="text-sm text-indigo-1600 hover:text-pink-1SS800 font-medium"
                          >
                            Forgot password?
                          </Link>
                        </motion.div>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pl-10 py-3 pr-10 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 bg-white/80"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="flex items-center"
                    >
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-indigo-1000 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </motion.div>
                    
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-indigo-700 to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all overflow-hidden relative"
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
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <LogIn className="mr-2 h-5 w-5" />
                            Sign In
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
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="inline-block"
                      >
                        <Link to="/register" className="text-Indigo-1600 hover:text-pink-800 font-medium">
                          Create one now
                        </Link>
                      </motion.span>
                    </p>
                  </motion.div>
                  
                  {/* Social login options */}
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
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
                          transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
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
            </TiltCard>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}