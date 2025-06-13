import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "../components/ui/card";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Nimal Perera",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sanduni Jayasinghe",
    role: "Lead Travel Designer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Chathura Fernando",
    role: "Operations Manager",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Dilani Senanayake",
    role: "Marketing Specialist",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ashan Silva",
    role: "Adventure Guide",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Nadeesha Weerasinghe",
    role: "Customer Relations",
    img: "https://randomuser.me/api/portraits/women/90.jpg",
  },
];

const timeline = [
  {
    year: "2019",
    event: "Ceylon Escape founded with a vision to make Sri Lanka accessible to global travelers.",
  },
  {
    year: "2020",
    event: "Launched our first signature wildlife and cultural tours.",
  },
  {
    year: "2021",
    event: "Reached 1,000+ happy travelers and launched exclusive eco-tours.",
  },
  {
    year: "2022",
    event: "Expanded to offer custom honeymoon and family packages.",
  },
  {
    year: "2023",
    event: "Awarded 'Best Local Tour Operator' by Sri Lanka Tourism Board.",
  },
  {
    year: "2024",
    event: "Partnered with local communities for sustainable tourism projects.",
  },
];

export default function About() {
  const teamRef = useRef(null);
  const timelineRef = useRef(null);
  const featuresRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    // Team section animation
    gsap.from(".team-member", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      scrollTrigger: {
        trigger: teamRef.current,
        start: "top 75%",
      },
    });
    
    // Timeline section animation
    gsap.from(".timeline-item", {
      x: -30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
      },
    });

    // Features section animation
    gsap.from(".feature-item", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
      },
    });
    
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto py-16 px-4 sm:px-8">
      {/* Stylish Title */}
      <motion.h1 
        className="text-4xl md:text-5xl font-extrabold mb-4 text-ceylon-700 text-center tracking-tight drop-shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About <span className="text-ceylon-500">Ceylon Escape</span>
      </motion.h1>

      {/* Divider */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ width: 0 }}
        animate={{ width: "8rem" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="inline-block w-32 h-1.5 rounded bg-gradient-to-r from-ceylon-400 via-ceylon-600 to-ceylon-400 shadow-md"></span>
      </motion.div>

      {/* Highlighted Brand Description */}
      <motion.p 
        className="text-gray-700 mb-8 text-lg text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="font-semibold text-ceylon-600">Ceylon Escape</span> is your gateway to Sri Lanka's wonders.
        Discover <span className="text-ceylon-500 font-semibold">curated experiences</span>, unique destinations,
        and the heart of island hospitality.
      </motion.p>

      {/* Features Box with Gentle Background and Shadow */}
      <motion.div 
        ref={featuresRef}
        className="bg-gradient-to-br from-ceylon-50 via-ceylon-100 to-white rounded-2xl shadow-lg p-8 md:p-12 mb-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-ceylon-800 mb-6 text-center">
          Why Travel With Us?
        </h2>
        <ul className="list-none space-y-6">
          <li className="feature-item flex items-center justify-center text-lg">
            <span className="text-ceylon-600 text-2xl mr-4">🌍</span>
            <span className="text-gray-800 font-medium">Expert local guides</span>
          </li>
          <li className="feature-item flex items-center justify-center text-lg">
            <span className="text-ceylon-600 text-2xl mr-4">🗺️</span>
            <span className="text-gray-800 font-medium">Personalized itineraries</span>
          </li>
          <li className="feature-item flex items-center justify-center text-lg">
            <span className="text-ceylon-600 text-2xl mr-4">🌱</span>
            <span className="text-gray-800 font-medium">Sustainable and authentic travel</span>
          </li>
          <li className="feature-item flex items-center justify-center text-lg">
            <span className="text-ceylon-600 text-2xl mr-4">🤝</span>
            <span className="text-gray-800 font-medium">Community partnerships</span>
          </li>
        </ul>
      </motion.div>

      {/* Team Section */}
      <div className="my-16" ref={teamRef}>
        <motion.h2 
          className="text-2xl font-bold text-ceylon-800 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h2>
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-ceylon-400 to-ceylon-600 mx-auto rounded-full mb-10"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map((member) => (
            <Card
              key={member.name}
              className="team-member p-6 border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full border-4 border-ceylon-200 mb-4 object-cover shadow"
              />
              <h3 className="text-lg font-bold text-ceylon-700">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-16" ref={timelineRef}>
        <motion.h2 
          className="text-2xl font-bold text-ceylon-800 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Journey
        </motion.h2>
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-ceylon-400 to-ceylon-600 mx-auto rounded-full mb-10"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>
        
        <ol className="relative border-l-4 border-ceylon-300 ml-6">
          {timeline.map((item) => (
            <li key={item.year} className="timeline-item mb-10 ml-6">
              <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-ceylon-600 rounded-full ring-4 ring-ceylon-100 text-white font-bold text-lg shadow-lg">
                {item.year}
              </span>
              <div className="bg-ceylon-50 rounded-xl shadow px-5 py-3 ml-3">
                <p className="text-gray-700">{item.event}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Optional Decorative Background Element */}
      <div className="absolute left-0 right-0 -z-10 opacity-10 pointer-events-none">
        <svg className="mx-auto mt-20" width="280" height="80">
          <ellipse cx="140" cy="40" rx="130" ry="18" fill="#3b82f6" />
        </svg>
      </div>
    </div>
  );
}