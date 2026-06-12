'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Wrench, Clock, ShieldCheck } from 'lucide-react';

const MaintenanceMode = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex flex-col items-center justify-center p-4 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full border-[1px] border-white/5 border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full border-[1px] border-white/10"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 md:p-14 shadow-2xl border border-white/10 text-center relative z-10"
      >
        <div className="flex justify-center mb-10 relative h-[150px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="text-blue-500 absolute top-0"
          >
            <Settings size={120} strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="text-indigo-400 absolute top-[55px] left-[calc(50%+25px)]"
          >
            <Settings size={65} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="text-purple-400 absolute top-[80px] left-[calc(50%-75px)]"
          >
            <Settings size={45} strokeWidth={2} />
          </motion.div>
        </div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 tracking-tight"
        >
          System Upgrade in Progress
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          We are currently performing scheduled maintenance to bring you exciting new features and a better experience. We will be back online shortly!
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
            <Clock className="text-blue-400 mb-3" size={32} />
            <h3 className="font-semibold text-white mb-2 text-lg">Coming Back Soon</h3>
            <p className="text-sm text-slate-400 leading-relaxed">We're wrapping things up. Please check back in a little while.</p>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
            <ShieldCheck className="text-indigo-400 mb-3" size={32} />
            <h3 className="font-semibold text-white mb-2 text-lg">Data is Secure</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Your information and data remain completely safe during this update.</p>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
            <Wrench className="text-purple-400 mb-3" size={32} />
            <h3 className="font-semibold text-white mb-2 text-lg">New Enhancements</h3>
            <p className="text-sm text-slate-400 leading-relaxed">We are rolling out exciting new tools and performance improvements.</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-sm text-slate-500 font-medium tracking-wide"
        >
          THANK YOU FOR YOUR PATIENCE
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MaintenanceMode;
