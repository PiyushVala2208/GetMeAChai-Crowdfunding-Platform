"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const About = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-yellow-500/30 overflow-x-hidden pt-20 md:pt-28 pb-20">
      
      
      <div className="fixed inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <div className="container mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-32"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 md:mb-10 tracking-tighter leading-[1.1]">
            About <br className="md:hidden" /> 
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent italic px-2">
              Get Me a Chai
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light px-2">
            Fueling the next generation of creators. We provide the tools for 
            <span className="text-yellow-500 font-medium"> seamless collaboration </span> 
            and direct support, making passion projects sustainable.
          </p>
        </motion.div>

        {/* HOW IT WORKS */}
        <motion.div
           initial="hidden" 
           whileInView="visible" 
           viewport={{ once: true, margin: "-50px" }}
           variants={fadeUp}
        >
          <h2 className="text-2xl md:text-5xl font-black mb-12 text-center tracking-tight text-white">
            The <span className="text-yellow-500 italic underline decoration-white/10 underline-offset-8">Ecosystem.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-20 md:mb-32">
            <div className="group p-px bg-gradient-to-b from-white/20 to-transparent rounded-3xl hover:from-yellow-500 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-center p-6 md:p-10 bg-black/80 backdrop-blur-3xl rounded-[calc(1.5rem-1px)] h-full border border-white/5">
                <img className="w-20 md:w-28 h-20 md:h-28 mb-6 lg:mb-0 lg:mr-8 group-hover:scale-110 transition-transform duration-500" src="/group.gif" alt="Collaboration" />
                <div className="text-center lg:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">Fans as Partners</h3>
                  <p className="text-slate-400 text-sm md:text-lg leading-relaxed">Your audience isn't just watching—they're investing in your growth.</p>
                </div>
              </div>
            </div>
            
            <div className="group p-px bg-gradient-to-b from-white/20 to-transparent rounded-3xl hover:from-yellow-500 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-center p-6 md:p-10 bg-black/80 backdrop-blur-3xl rounded-[calc(1.5rem-1px)] h-full border border-white/5">
                <img className="w-20 md:w-28 h-20 md:h-28 mb-6 lg:mb-0 lg:mr-8 group-hover:scale-110 transition-transform duration-500" src="/coin.gif" alt="Support" />
                <div className="text-center lg:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">Micro-Support</h3>
                  <p className="text-slate-400 text-sm md:text-lg leading-relaxed">Direct financial backing that adds up to massive creative freedom.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BENEFITS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:bg-white/[0.05] transition-colors"
          >
            <h2 className="text-2xl md:text-3xl font-black mb-8 flex items-center tracking-tight">
              <span className="w-1.5 h-8 bg-yellow-500 rounded-full mr-4"></span>
              Creators <span className="ml-2 text-yellow-500">Edge</span>
            </h2>
            <ul className="space-y-5">
              {[
                "Instant payouts from your global fanbase",
                "Deep engagement with personal touchpoints",
                "Custom landing pages for your projects",
                "Verified creator badge for credibility"
              ].map((item, i) => (
                <li key={i} className="flex items-start text-slate-400 text-sm md:text-lg">
                  <span className="text-yellow-500 mr-3">✦</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.03] backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:bg-white/[0.05] transition-colors"
          >
            <h2 className="text-2xl md:text-3xl font-black mb-8 flex items-center tracking-tight">
              <span className="w-1.5 h-8 bg-white/40 rounded-full mr-4"></span>
              Fans <span className="ml-2 text-slate-200">Perks</span>
            </h2>
            <ul className="space-y-5">
              {[
                "Exclusive access to behind-the-scenes",
                "Direct shoutouts in creator content",
                "Member-only discord and communities",
                "Support icons on your public profile"
              ].map((item, i) => (
                <li key={i} className="flex items-start text-slate-400 text-sm md:text-lg">
                  <span className="text-white/40 mr-3">✦</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { title: "Innovation", desc: "Pushing boundaries with AI-driven tools.", icon: "⚡" },
            { title: "Network", desc: "Connect with 10k+ verified creators.", icon: "🌐" },
            { title: "Secure", desc: "Encryption for every single transaction.", icon: "🔒" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-yellow-500/20 transition-all"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;