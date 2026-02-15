'use client';

import { useEffect, useRef } from 'react';
import { useRideStore } from '@/store/ride';

export function DriverSimulator() {
  const {
    routePolyline,
    isSimulating,
    simulationSpeed,
    setDriverLocation,
    setAnimationProgress,
    pickupLocation,
    isGoogleMapsLoaded,
  } = useRideStore();

  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const pathRef = useRef<google.maps.LatLng[]>([]);

  useEffect(() => {
    if (routePolyline && isGoogleMapsLoaded) {
      pathRef.current = google.maps.geometry.encoding.decodePath(routePolyline);
    } else {
      pathRef.current = [];
    }
  }, [routePolyline, isGoogleMapsLoaded]);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsedTime = (timestamp - startTimeRef.current) / 1000; // in seconds
    const speedInMetersPerSecond = (simulationSpeed * 1000) / 3600;
    const distanceCovered = elapsedTime * speedInMetersPerSecond;

    const totalDistance = google.maps.geometry.spherical.computeLength(pathRef.current);
    let progress = distanceCovered / totalDistance;

    if (progress >= 1) {
      progress = 1;
      setDriverLocation(pathRef.current[pathRef.current.length - 1].toJSON());
      setAnimationProgress(1);
      cancelAnimationFrame(animationFrameRef.current!);
      return;
    }

    const currentPosition = getPointAtDistance(pathRef.current, distanceCovered);
    setDriverLocation(currentPosition);
    setAnimationProgress(progress);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isSimulating && pathRef.current.length > 0) {
      startTimeRef.current = undefined;
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSimulating, pathRef.current]);
  
    useEffect(() => {
    if (pickupLocation) {
      setDriverLocation(pickupLocation);
    }
  }, [pickupLocation, setDriverLocation]);


  // Helper function to find a point at a specific distance along a path
  function getPointAtDistance(path: google.maps.LatLng[], distance: number): google.maps.LatLngLiteral {
    let coveredDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i + 1];
      const segmentLength = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);

      if (coveredDistance + segmentLength >= distance) {
        const fraction = (distance - coveredDistance) / segmentLength;
        const heading = google.maps.geometry.spherical.computeHeading(p1, p2);
        return google.maps.geometry.spherical.computeOffset(p1, (distance - coveredDistance), heading).toJSON();
      }

      coveredDistance += segmentLength;
    }
    return path[path.length - 1].toJSON(); // Should not be reached if progress < 1
  }

  return null; // This is a non-visual component
}
