'use client';

import { useRideStore } from '@/store/ride';
import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import Image from 'next/image';

export function TripInProgress() {
  const { driverInfo, dropoffLocationAddress } = useRideStore();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-top z-40"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center">
          <Image src="/driver.png" alt="Driver" width={48} height={48} className="rounded-full mr-4" />
          <div>
            <p className="font-semibold">{driverInfo?.name || 'Your Driver'}</p>
            <p className="text-gray-500 text-sm">On the way to destination</p>
          </div>
        </div>
        <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
          <Phone className="h-5 w-5" />
        </button>
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-lg truncate flex-1 mr-4">
            {dropoffLocationAddress || 'Destination'}
          </p>
          <ChevronRight className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
}
