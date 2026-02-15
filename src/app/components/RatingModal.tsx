'use client';

import { useRideStore } from '@/store/ride';

export function RatingModal() {
  const rating = useRideStore((state) => state.rating);
  const setRating = useRideStore((state) => state.setRating);
  const feedback = useRideStore((state) => state.feedback);
  const setFeedback = useRideStore((state) => state.setFeedback);
  const resetRide = useRideStore((state) => state.resetRide);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Rate Your Ride</h2>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-4xl ${rating && rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          className="w-full border rounded-md p-2"
          placeholder="Leave a comment..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
          onClick={resetRide}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
