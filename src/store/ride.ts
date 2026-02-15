import { create } from 'zustand';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface RideState {
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
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
  isSimulating: boolean;
  simulationSpeed: number;
  isFollowingDriver: boolean;
  setPickupLocation: (location: Location | null) => void;
  setDropoffLocation: (location: Location | null) => void;
  setIsPickupWithinMaiduguri: (isWithin: boolean | null) => void;
  setIsDropoffWithinMaiduguri: (isWithin: boolean | null) => void;
  setMapInstance: (map: google.maps.Map | null) => void;
  setIsGoogleMapsLoaded: (isLoaded: boolean) => void;
  setRideStatus: (status: RideState['rideStatus']) => void;
  setUserCurrentLocation: (location: google.maps.LatLngLiteral | null) => void;
  setGeolocationError: (error: string | null) => void;
  setRoutePolyline: (polyline: string | null) => void;
  setDriverLocation: (location: google.maps.LatLngLiteral | null) => void;
  setAnimationProgress: (progress: number) => void;
  setIsSimulating: (isSimulating: boolean) => void;
  setSimulationSpeed: (speed: number) => void;
  setIsFollowingDriver: (isFollowing: boolean) => void;
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
  isSimulating: false,
  simulationSpeed: 50, // Default speed in km/h
  isFollowingDriver: true, // Follow driver by default
  setPickupLocation: (location) => set({ pickupLocation: location }),
  setDropoffLocation: (location) => set({ dropoffLocation: location }),
  setIsPickupWithinMaiduguri: (isWithin) => set({ isPickupWithinMaiduguri: isWithin }),
  setIsDropoffWithinMaiduguri: (isWithin) => set({ isDropoffWithinMaiduguri: isWithin }),
  setMapInstance: (map) => set({ mapInstance: map }),
  setIsGoogleMapsLoaded: (isLoaded) => set({ isGoogleMapsLoaded: isLoaded }),
  setRideStatus: (status) => set({ rideStatus: status }),
  setUserCurrentLocation: (location) => set({ userCurrentLocation: location }),
  setGeolocationError: (error) => set({ geolocationError: error }),
  setRoutePolyline: (polyline) => set({ routePolyline: polyline }),
  setDriverLocation: (location) => set({ driverLocation: location }),
  setAnimationProgress: (progress) => set({ animationProgress: progress }),
  setIsSimulating: (isSimulating) => set({ isSimulating }),
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
  setIsFollowingDriver: (isFollowing) => set({ isFollowingDriver: isFollowing }),
}));
