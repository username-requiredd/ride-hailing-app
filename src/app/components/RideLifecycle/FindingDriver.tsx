'use client';

import { motion } from 'framer-motion';
import { CarFront } from 'lucide-react';

export function FindingDriver() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <CarFront className="h-16 w-16 mx-auto text-gray-800" />
        </motion.div>
        <h2 className="text-2xl font-bold mt-4">Finding your driver...</h2>
        <p className="text-gray-600 mt-2">Please wait a moment.</p>
      </motion.div>
    </div>
  );
}
