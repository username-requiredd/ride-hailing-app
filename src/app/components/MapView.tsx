'use client';

import { useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useRideStore } from '@/store/ride';
import { CarMarker } from './CarMarker';
import { shallow } from 'zustand/shallow';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultCenter = {
  lat: 11.8345, // Maiduguri center
  lng: 13.1507,
};

const mapOptions = {
  styles: [
    // ... (Your existing map styles)
        {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ],
  disableDefaultUI: true,
};

const libraries: ("places" | "geometry")[] = ['places', 'geometry'];

export function MapView() {
  const {
    pickupLocation,
    dropoffLocation,
    driverLocation,
    setMapInstance,
    setIsGoogleMapsLoaded,
    routePolyline,
  } = useRideStore(
    (state) => ({
      pickupLocation: state.pickupLocation,
      dropoffLocation: state.dropoffLocation,
      driverLocation: state.driverLocation,
      setMapInstance: state.setMapInstance,
      setIsGoogleMapsLoaded: state.setIsGoogleMapsLoaded,
      routePolyline: state.routePolyline,
    }),
    shallow
  );

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapInstance(map);
    setIsGoogleMapsLoaded(true);
  }, [setMapInstance, setIsGoogleMapsLoaded]);

  const onMapUnmount = useCallback(() => {
    setMapInstance(null);
    setIsGoogleMapsLoaded(false);
  }, [setMapInstance, setIsGoogleMapsLoaded]);

  if (loadError) {
    return <div>Error loading maps. Please check the API key and internet connection.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      options={mapOptions}
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
    >
      {pickupLocation && <Marker position={{ lat: pickupLocation.lat, lng: pickupLocation.lng }} label={{ text: "P", color: "white" }} />}
      {dropoffLocation && <Marker position={{ lat: dropoffLocation.lat, lng: dropoffLocation.lng }} label={{ text: "D", color: "white" }} />}
      
      {routePolyline && (
        <Polyline
          path={google.maps.geometry.encoding.decodePath(routePolyline)}
          options={{
            strokeColor: '#4A90E2',
            strokeOpacity: 0.8,
            strokeWeight: 6,
            geodesic: true,
          }}
        />
      )}

      {driverLocation && <CarMarker position={driverLocation} />}
    </GoogleMap>
  ) : <div>Loading Map...</div>;
}
