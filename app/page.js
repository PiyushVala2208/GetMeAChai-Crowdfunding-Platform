"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Lenis from "lenis";

/* PERFORMANCE VARIANTS */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function Home() {
  
  // LENIS SMOOTH SCROLL INITIALIZATION
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-white selection:bg-yellow-500/30 overflow-x-hidden">

      {/* SCROLLBAR HIDE */}
      <style jsx global>{`
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          overscroll-behavior-y: none;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-12 text-center overflow-hidden">

        {/* Glow blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-1/4 h-[500px] w-[500px] bg-purple-600/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl"
        >
          {/* TEA GIF  */}
          <motion.div variants={fadeUp} className="relative group mb-4 md:mb-8">
            <div className="absolute inset-0 bg-orange-600 blur-[60px] rounded-full opacity-60 scale-125 transition-all duration-700 group-hover:scale-150 group-hover:opacity-90" />

            <div className="relative z-10 bg-orange-400/80 backdrop-blur-3xl border-2 border-orange-500/80 p-4 md:p-6 rounded-[2.5rem] md:rounded-[3rem] shadow-[inset_0_0_20px_rgba(255,165,0,0.3),0_0_40px_rgba(234,88,12,0.4)]">
              <img
                src="/tea.gif"
                alt="Chai"
                className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(255,140,0,0.9)) brightness(1.1) contrast(1.1)",
                }}
              />
              <div className="absolute top-2 left-4 w-10 md:w-14 h-5 md:h-7 bg-white/20 blur-md rounded-full -rotate-15" />
              <div className="absolute bottom-2 right-4 w-8 md:w-10 h-4 md:h-5 bg-orange-400/20 blur-lg rounded-full" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1]"
          >
            <span className="bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
              Get Me a
            </span>
            <span className="text-yellow-500 drop-shadow-[0_0_25px_rgba(234,179,8,0.4)] italic ml-2 md:ml-4">
              Chai
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-base md:text-2xl max-w-2xl font-light tracking-wide px-4"
          >
            Your community's hub for support. A premium space where creators get
            funded{" "}
            <span className="text-white font-medium italic underline decoration-yellow-500/40 underline-offset-8">
              one cup at a time.
            </span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-10 justify-center"
          >
            <Link href="/login">
              <button className="px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all active:scale-95">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
                  Start Fundraising
                </span>
              </button>
            </Link>

            <Link href="/about">
              <button className="px-8 md:px-12 py-3 md:py-4 border border-slate-700 rounded-2xl font-bold text-base md:text-lg text-slate-300 hover:text-white hover:border-slate-400 transition-all active:scale-95">
                How it works
              </button>
            </Link>
          </motion.div>

        </motion.div>
      </section>

      {/* FEATURES  */}
      <section className="container mx-auto py-24 px-6 relative">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tight"
        >
          Fans want to <span className="text-yellow-500 italic">Help.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Direct Support",
              img: "/man.gif",
              wrapper: "p-[1px] bg-gradient-to-b from-purple-500/40 via-transparent to-transparent",
              card: "border-white/5",
              text: "text-purple-400",
              glow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]",
              desc: "Empower creators with instant, direct, and meaningful support."
            },
            {
              title: "Gold Standard",
              img: "/coin.gif",
              wrapper: "p-[2px] bg-gradient-to-b from-yellow-500/60 via-transparent to-transparent shadow-2xl shadow-yellow-500/10",
              card: "border-yellow-500/30",
              text: "text-yellow-500",
              glow: "shadow-[0_0_60px_rgba(255,215,0,0.45),inset_0_0_20px_rgba(255,200,80,0.25)]",
              desc: "The benchmark for secure, premium, and trusted fundraising."
            },
            {
              title: "Collaborate",
              img: "/group.gif",
              wrapper: "p-[1px] bg-gradient-to-b from-blue-500/40 via-transparent to-transparent",
              card: "border-white/5",
              text: "text-blue-400",
              glow: "shadow-[0_0_40px_rgba(59,130,246,0.15)]",
              desc: "Build together, grow together, and create something bigger."
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                y: -14,
                scale: 1.035,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  mass: 0.6,
                },
              }}
              className={`rounded-[3.5rem] ${item.wrapper}`}
            >
              <div
                className={`bg-[#020617]/90 backdrop-blur-sm p-12 rounded-[3.4rem] h-full border ${item.card} flex flex-col items-center text-center`}
              >
                <div
                  className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 ${item.glow}`}
                >
                  <img
                    src={item.img}
                    width={70}
                    height={70}
                    alt={item.title}
                  />
                </div>

                <h3 className={`text-3xl font-bold mb-4 ${item.text}`}>
                  {item.title}
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container mx-auto px-6 pb-20 pt-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0f1e] to-black rounded-[3rem] border border-white/10 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left z-10">
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent leading-tight pr-6 overflow-visible italic"> Ready to Sip? </h2>
            <p className="text-slate-400 text-lg font-light mt-2"> Join the revolution of community-based funding. </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-5 z-10"> 
            <button className="px-10 py-4 bg-yellow-500 text-black font-black text-xl rounded-2xl hover:bg-yellow-400 transition-all shadow-[0_10px_25px_-5px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 whitespace-nowrap"> JOIN NOW </button> 
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-500/5 blur-[80px] rounded-full">
          </div>
        </div>
      </footer>
    </div>
  );
}