'use client';

import { useEffect, useRef, useState } from 'react';
import { useRideStore } from '@/store/ride';

export function DriverSimulator() {
  const {
    pickupLocation,
    dropoffLocation,
    setDriverLocation,
    setRideStatus,
    setTripSummary,
  } = useRideStore();
  const [route, setRoute] = useState<google.maps.LatLngLiteral[]>([]);
  const step = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // 1. Fetch the route when locations are set
  useEffect(() => {
    if (!pickupLocation || !dropoffLocation) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new google.maps.LatLng(pickupLocation),
        destination: new google.maps.LatLng(dropoffLocation),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const path = result.routes[0].overview_path.map(p => ({ lat: p.lat(), lng: p.lng() }));
          setRoute(path);

          // Calculate and set trip summary
          const leg = result.routes[0].legs[0];
          if (leg.distance && leg.duration) {
            setTripSummary({
              distance: leg.distance.value / 1609.34, // to miles
              duration: leg.duration.value / 60, // to minutes
              fare: 25.50, // Placeholder fare
            });
          }
        }
      }
    );

    return () => {
      // Cleanup on unmount or when locations change
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      step.current = 0;
      setRoute([]);
    };
  }, [pickupLocation, dropoffLocation, setTripSummary]);

  // 2. Animate the driver along the route
  useEffect(() => {
    if (route.length === 0) return;

    const animate = () => {
      if (step.current >= route.length) {
        setRideStatus('finished'); // Trip is complete
        return;
      }

      setDriverLocation(route[step.current]);
      step.current += 1;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [route, setDriverLocation, setRideStatus]);

  return null; // This component does not render anything
}
