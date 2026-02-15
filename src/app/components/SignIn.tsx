'use client';

import { useRideStore } from '@/store/ride';

export default function SignIn() {
  const rideStatus = useRideStore(s => s.rideStatus);

  if (rideStatus !== 'idle') {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>
        <p className="text-gray-600 mb-6">Sign in to start booking rides.</p>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          onClick={() => useRideStore.setState({ rideStatus: 'configuring' })}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
