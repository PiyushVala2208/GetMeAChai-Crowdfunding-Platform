"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const socialLinks = [
    { 
      Icon: Instagram, 
      name: "Instagram",
      color: "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)", 
      shadow: "0 10px 20px rgba(238, 42, 123, 0.4)" 
    },
    { 
      Icon: Twitter, 
      name: "Twitter",
      color: "#1DA1F2", 
      shadow: "0 10px 20px rgba(29, 161, 242, 0.4)" 
    },
    { 
      Icon: Github, 
      name: "Github",
      color: "#333", 
      shadow: "0 10px 20px rgba(255, 255, 255, 0.2)" 
    },
    { 
      Icon: Linkedin, 
      name: "Linkedin",
      color: "#0077B5", 
      shadow: "0 10px 20px rgba(0, 119, 181, 0.4)" 
    },
  ];

  return (
    <footer className="relative bg-[#030303] pt-20 pb-10 px-6 overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-yellow-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter text-white mb-2">
              GetMeA<span className="text-yellow-500 ">Chai</span>
            </h2>
            <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-black opacity-60">
              Fueling Creativity One Cup at a Time
            </p>
          </div>

          {/* Social Icons Section */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href="#" 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: hoveredIndex === i ? social.color : '',
                  borderColor: hoveredIndex === i ? (i === 0 ? '#ee2a7b' : social.color) : '',
                  boxShadow: hoveredIndex === i ? social.shadow : '',
                  color: hoveredIndex === i ? '#fff' : ''
                }}
              >
                <social.Icon 
                  size={22} 
                  className={`transition-transform duration-500 ${hoveredIndex === i ? 'scale-110 rotate-3' : ''}`} 
                />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
          <p>© {currentYear} GetMeA Chai. All rights reserved.</p>
          
          <div className="flex items-center gap-2 group cursor-default">
            <span>Developed with</span>
            
            <motion.span 
              animate={{ 
                opacity: [0.6, 1, 0.6],
                filter: ["drop-shadow(0 0 2px #ef4444)", "drop-shadow(0 0 12px #ef4444)", "drop-shadow(0 0 2px #ef4444)"]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-red-500 text-base inline-block mx-1"
            >
              ❤️
            </motion.span>
            
            <span>by</span>
            
           
            <span 
              className="text-3xl lowercase italic text-yellow-500 tracking-normal px-2 group-hover:text-orange-500 transition-colors duration-500" 
              style={{ fontFamily: "'Dancing Script', cursive, sans-serif", marginTop: '-8px' }}
            >
              pd
            </span>
          </div>
        </div>
      </div>

      {/* Global Font Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
      `}</style>
    </footer>
  );
}