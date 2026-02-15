'use client';

import { useEffect, useRef } from 'react';
import { useRideStore } from '@/store/ride';

export function SimulationController() {
  const {
    rideStatus,
    routePolyline,
    setDriverLocation,
  } = useRideStore();
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (rideStatus !== 'in-progress' || !routePolyline) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const decodedPath = google.maps.geometry.encoding.decodePath(routePolyline);
    let step = 0;

    const animate = () => {
      if (step >= decodedPath.length) {
        return;
      }

      setDriverLocation({ lat: decodedPath[step].lat(), lng: decodedPath[step].lng() });
      step++;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rideStatus, routePolyline, setDriverLocation]);

  return null;
}
