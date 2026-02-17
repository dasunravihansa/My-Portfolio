"use client";

import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function NotFound() {
  return (
    <main className={`min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white ${spaceGrotesk.className} overflow-hidden relative`}>
      
      {/* Background Noise & Glow */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* 404 Glitch Text */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-brand-green to-transparent select-none drop-shadow-[0_0_15px_rgba(21,245,88,0.5)]">
          404
        </h1>
        
        <motion.div 
            animate={{ x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-50 mix-blend-screen pointer-events-none"
        >
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-red-500 blur-[2px]">404</h1>
        </motion.div>
      </motion.div>

      {/* Message */}
      <div className="relative z-10 text-center mt-[-20px] px-6">
        <div className="flex items-center justify-center gap-3 text-brand-green mb-4">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
            <span className="text-lg font-bold tracking-widest uppercase">Page Not Found</span>
        </div>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back Home Button */}
        <Link href="/" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-brand-green/30 rounded-full overflow-hidden hover:border-brand-green transition-all duration-300">
            <div className="absolute inset-0 bg-brand-green/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Home className="w-5 h-5 text-brand-green group-hover:text-white transition-colors relative z-10" />
            <span className="text-brand-green font-bold tracking-wide group-hover:text-white transition-colors relative z-10">BACK TO HOME</span>
        </Link>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-10 left-0 w-full text-center text-gray-600 text-xs tracking-[0.3em] uppercase opacity-50">
        System Error • 0x404 • Lost in Space
      </div>

    </main>
  );
}