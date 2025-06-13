import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { Card } from "./ui/card";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const testimonialsRef = useRef(null);
  
  const testimonials = [
    {
      name: "Samantha Perera",
      role: "Adventure Traveler",
      text: "Ceylon Escape made our Sri Lanka trip truly unforgettable. The guides were incredibly knowledgeable and friendly, showing us hidden gems we would have never found on our own.",
      avatar: "https://randomuser.me/api/portraits/women/81.jpg",
      rating: 5
    },
    {
      name: "John Smith",
      role: "Family Vacation",
      text: "Breathtaking destinations and seamless organization. Everything was perfectly planned, from transportation to accommodations. Our kids loved every minute of it!",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
      rating: 5
    },
    {
      name: "Ishara Fernando",
      role: "Cultural Explorer",
      text: "Amazing service and stunning locations. Their knowledge of local culture and history made this trip educational as well as beautiful. Will travel again with Ceylon Escape!",
      avatar: "https://randomuser.me/api/portraits/women/83.jpg",
      rating: 4
    }
  ];
  
  // Animation for testimonial items
  useEffect(() => {
    const testimonialsElement = testimonialsRef.current;
    if (!testimonialsElement) return;
    
    gsap.from(".testimonial-card", {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: testimonialsElement,
        start: "top 75%",
      },
    });
  }, []);
  
  return (
    <section ref={testimonialsRef} className="py-20 bg-ceylon-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-ceylon-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Travelers Say
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-ceylon-400 to-ceylon-600 mx-auto rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card 
              key={testimonial.name}
              className="testimonial-card p-8 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <Quote className="w-10 h-10 text-ceylon-200" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 my-6 italic">{testimonial.text}</p>
              </div>
              
              <div className="flex items-center mt-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-ceylon-200"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-ceylon-700">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}