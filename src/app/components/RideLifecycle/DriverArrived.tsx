'use client';

import { useRideStore } from '@/store/ride';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import Image from 'next/image';

export function DriverArrived() {
  const { driverInfo, setRideStatus } = useRideStore();

  if (!driverInfo) return null;

  const handleStartTrip = () => {
    setRideStatus('in-progress');
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-top z-40"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center mb-4">
        <Image src="/driver.png" alt="Driver" width={64} height={64} className="rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-bold">{driverInfo.name} has arrived</h3>
          <p className="text-gray-600">{driverInfo.car}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-bold text-lg">{driverInfo.license}</p>
          <p className="text-gray-500">License Plate</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button onClick={handleStartTrip} className="btn-primary flex-grow">
          Start Trip
        </button>
        <button className="p-4 bg-gray-200 rounded-lg">
          <Phone className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
}
