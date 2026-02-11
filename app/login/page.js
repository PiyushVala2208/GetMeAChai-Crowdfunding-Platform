"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.title = "Login - Get Me A Chai";
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <main className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-xs font-medium uppercase tracking-widest text-yellow-500">
              Welcome Back
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
            Login to <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent">Get Started</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            Support your favorite creators with the price of a chai.
          </p>
        </motion.div>

        {/* Buttons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1  gap-4 w-full max-w-2xl"
        >
          {[
            { id: 'google', name: "Google", color: "hover:shadow-blue-500/20", icon: <svg className="h-6 w-6 mr-3" viewBox="-0.5 0 48 48"><g fill="none"><path d="M9.827 24c0-1.524.253-2.986.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.867 7.26 2.406 10.388l7.905-6.05c-.448-1.365-.698-2.821-.698-4.338" fill="#FBBC05"/><path d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094L39.202 6.4C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04c1.822-5.532 7.017-9.511 13.182-9.511" fill="#EB4335"/><path d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.51l-7.907 6.038c3.822 7.761 11.803 13.072 21.089 13.072 5.732 0 11.204-2.035 15.311-5.848l-7.507-5.804c-2.118 1.334-4.785 2.052-7.804 2.052" fill="#34A853"/><path d="M46.145 24c0-1.387-.214-2.88-.534-4.267H23.714v9.067h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804c4.314-4.004 7.12-9.969 7.12-17.618" fill="#4285F4"/></g></svg> },
            { id: 'github', name: "Github", color: "hover:shadow-white/10", icon: <svg className="h-6 w-6 mr-3 fill-white" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
            { id: 'linkedin', name: "LinkedIn", color: "hover:shadow-blue-600/20", icon: <svg className="h-6 w-6 mr-3 fill-[#0077b5]" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
            { id: 'apple', name: "Apple", color: "hover:shadow-white/10", icon: <svg className="h-6 w-6 mr-3 fill-white" viewBox="0 0 24 24"><path d="M17.057 12.781c.032 2.588 2.254 3.462 2.287 3.477-.023.072-.351 1.203-1.151 2.366-.693 1.011-1.413 2.016-2.534 2.037-1.102.021-1.457-.652-2.72-.652-1.261 0-1.656.631-2.701.672-1.083.041-1.921-1.096-2.619-2.107-1.427-2.07-2.515-5.842-1.045-8.389.73-1.264 2.029-2.064 3.438-2.085 1.07-.021 2.077.719 2.731.719.653 0 1.879-.906 3.14-.781.53.021 2.014.214 2.966 1.606-.078.046-1.77 1.03-1.752 3.144zm-1.587-7.462c.571-.692.955-1.655.85-2.619-.828.033-1.83.551-2.424 1.243-.532.611-.998 1.594-.872 2.537.923.072 1.875-.469 2.446-1.161z"/></svg> },
          ].map((btn) => (
            <motion.button
              key={btn.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn(btn.id)}
              className={`group flex items-center justify-center w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white font-semibold transition-all duration-300 shadow-lg ${btn.color}`}
            >
              {btn.icon}
              <span className="text-lg">Continue with {btn.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Subtle Footer info */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-gray-500 text-sm italic"
        >
          By clicking continue, you agree to our Terms of Service.
        </motion.p>
      </main>
    </div>
  );
};

export default Login;