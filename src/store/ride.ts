import { create } from 'zustand';

export interface RideState {
  pickupLocation: google.maps.LatLngLiteral | null;
  dropoffLocation: google.maps.LatLngLiteral | null;
  userCurrentLocation: google.maps.LatLngLiteral | null;
  isPickupWithinMaiduguri: boolean | null;
  isDropoffWithinMaiduguri: boolean | null;
  rideStatus: 'idle' | 'configuring' | 'confirmed' | 'in-progress' | 'finished';
  routePolyline: string | null;
  driverLocation: google.maps.LatLngLiteral | null;
  animationProgress: number;
  mapInstance: google.maps.Map | null;
  isGoogleMapsLoaded: boolean;
  geolocationError: string | null;

  setPickupLocation: (location: google.maps.LatLngLiteral | null) => void;
  setDropoffLocation: (location: google.maps.LatLngLiteral | null) => void;
  setUserCurrentLocation: (location: google.maps.LatLngLiteral | null) => void;
  setIsPickupWithinMaiduguri: (isWithin: boolean) => void;
  setIsDropoffWithinMaiduguri: (isWithin: boolean) => void;
  setRideStatus: (status: RideState['rideStatus']) => void;
  setRoutePolyline: (polyline: string | null) => void;
  setDriverLocation: (location: google.maps.LatLngLiteral | null) => void;
  setAnimationProgress: (progress: number) => void;
  setMapInstance: (map: google.maps.Map | null) => void;
  setIsGoogleMapsLoaded: (isLoaded: boolean) => void;
  setGeolocationError: (error: string | null) => void;
}

export const useRideStore = create<RideState>((set) => ({
  pickupLocation: null,
  dropoffLocation: null,
  userCurrentLocation: null,
  isPickupWithinMaiduguri: null,
  isDropoffWithinMaiduguri: null,
  rideStatus: 'idle',
  routePolyline: null,
  driverLocation: null,
  animationProgress: 0,
  mapInstance: null,
  isGoogleMapsLoaded: false,
  geolocationError: null,

  setPickupLocation: (location) => set({ pickupLocation: location }),
  setDropoffLocation: (location) => set({ dropoffLocation: location }),
  setUserCurrentLocation: (location) => set({ userCurrentLocation: location }),
  setIsPickupWithinMaiduguri: (isWithin) => set({ isPickupWithinMaiduguri: isWithin }),
  setIsDropoffWithinMaiduguri: (isWithin) =>
    set({ isDropoffWithinMaiduguri: isWithin }),
  setRideStatus: (status) => set({ rideStatus: status }),
  setRoutePolyline: (polyline) => set({ routePolyline: polyline }),
  setDriverLocation: (location) => set({ driverLocation: location }),
  setAnimationProgress: (progress) => set({ animationProgress: progress }),
  setMapInstance: (map) => set({ mapInstance: map }),
  setIsGoogleMapsLoaded: (isLoaded) => set({ isGoogleMapsLoaded: isLoaded }),
  setGeolocationError: (error) => set({ geolocationError: error }),
}));
