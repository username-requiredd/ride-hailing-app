'use client';

import { useEffect, useRef, useState } from 'react';
import { useRideStore } from '@/store/ride';

interface UberStyleDriverFollowProps {
  mapInstance: google.maps.Map | null;
  driverLocation: google.maps.LatLngLiteral | null;
  isFollowingDriver: boolean;
  rideStatus: 'idle' | 'configuring' | 'confirmed' | 'in-progress' | 'finished';
}

export function useUberStyleDriverFollow({
  mapInstance,
  driverLocation,
  isFollowingDriver,
  rideStatus,
}: UberStyleDriverFollowProps) {
  const [isManuallyInteracting, setIsManuallyInteracting] = useState(false);
  const resumeFollowTimeout = useRef<NodeJS.Timeout | null>(null);

  // Effect to handle manual map interaction
  useEffect(() => {
    if (!mapInstance) return;

    const onDragStart = () => {
      if (resumeFollowTimeout.current) {
        clearTimeout(resumeFollowTimeout.current);
      }
      setIsManuallyInteracting(true);
    };

    const onIdle = () => {
      if (isManuallyInteracting) {
        resumeFollowTimeout.current = setTimeout(() => {
          setIsManuallyInteracting(false);
        }, 3000); // Resume follow after 3 seconds
      }
    };

    const dragListener = mapInstance.addListener('dragstart', onDragStart);
    const idleListener = mapInstance.addListener('idle', onIdle);

    return () => {
      dragListener.remove();
      idleListener.remove();
      if (resumeFollowTimeout.current) {
        clearTimeout(resumeFollowTimeout.current);
      }
    };
  }, [mapInstance, isManuallyInteracting]);

  // Effect for following the driver with Uber-style offset
  useEffect(() => {
    if (
      !mapInstance ||
      !driverLocation ||
      !isFollowingDriver ||
      isManuallyInteracting ||
      rideStatus !== 'in-progress'
    ) {
      return;
    }

    const calculateOffsetCenter = (): google.maps.LatLng => {
      const bounds = mapInstance.getBounds();
      if (!bounds) {
        return new google.maps.LatLng(driverLocation);
      }

      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const latSpan = northEast.lat() - southWest.lat();
      const latOffset = latSpan * 0.25; // Position driver 25% from the bottom

      return new google.maps.LatLng(driverLocation.lat + latOffset, driverLocation.lng);
    };

    const targetCenter = calculateOffsetCenter();

    const animate = () => {
        mapInstance.panTo(targetCenter);
    };

    const frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);

  }, [mapInstance, driverLocation, isFollowingDriver, isManuallyInteracting, rideStatus]);
}
