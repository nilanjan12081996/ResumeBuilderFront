'use client';

import React from 'react';
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { motion } from 'framer-motion';
import { Settings, Wrench, Clock, ShieldCheck } from 'lucide-react';

const MaintenanceModal = ({ show, onClose }) => {
  return (
    <Modal size="2xl" show={show} onClose={onClose} popup>
      <ModalHeader className="border-none absolute right-2 top-2 z-50 bg-transparent text-white mix-blend-difference" />
      <ModalBody className="p-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-black relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
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

        <div className="p-8 md:p-12 text-center relative z-10 text-white">
          <div className="flex justify-center mb-8 relative h-[100px] mt-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="text-blue-500 absolute top-0"
            >
              <Settings size={80} strokeWidth={1} />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="text-indigo-400 absolute top-[35px] left-[calc(50%+15px)]"
            >
              <Settings size={45} strokeWidth={1.5} />
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 tracking-tight"
          >
            Our Website is Under Maintenance
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-base text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed"
          >
            We are currently performing scheduled maintenance on our user systems. You can continue to browse our features, but logging in and signing up are temporarily paused.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
          >
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <Clock className="text-blue-400 mb-2" size={24} />
              <h3 className="font-semibold text-white mb-1 text-sm">Coming Back Soon</h3>
              <p className="text-xs text-slate-400 leading-relaxed">We'll be back online in 2 days.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <ShieldCheck className="text-indigo-400 mb-2" size={24} />
              <h3 className="font-semibold text-white mb-1 text-sm">Data is Secure</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Your account remains perfectly safe.</p>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={onClose}
            className="mt-8 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-semibold transition-all duration-300"
          >
            Return to Home Page
          </motion.button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MaintenanceModal;
