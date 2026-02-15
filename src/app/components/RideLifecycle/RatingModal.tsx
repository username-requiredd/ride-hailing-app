'use client';

import { useRideStore } from '@/store/ride';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

export function RatingModal() {
  const {
    tripSummary,
    resetRide,
    setRating,
    setFeedback,
    rating,
    feedback,
  } = useRideStore();
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    // In a real app, you would send this to a server
    console.log('Rating:', rating, 'Feedback:', feedback);
    resetRide();
  };

  if (!tripSummary) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">Trip Complete!</h1>
        <p className="text-center text-gray-500 mb-6">How was your ride?</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center text-lg">
            <p>Fare:</p>
            <p className="font-bold">${tripSummary.fare.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
            <p>Distance:</p>
            <p>{tripSummary.distance.toFixed(1)} miles</p>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>Duration:</p>
            <p>{tripSummary.duration.toFixed(0)} mins</p>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-10 w-10 cursor-pointer transition-colors duration-200 ${(
                hoverRating >= star || (rating || 0) >= star
              ) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          rows={3}
          placeholder="Leave a comment (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </motion.div>
    </div>
  );
}
