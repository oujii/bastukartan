'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Sauna } from '@stockholm-sauna/types';
import getConfig from '@stockholm-sauna/config';
import { generateSaunaSlug } from '../lib/utils';

interface MapProps {
  saunas: Sauna[];
  className?: string;
}

export default function Map({ saunas, className = '' }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    try {
      const config = getConfig();
      
      if (!config.mapbox?.accessToken) {
        setError('Mapbox access token not configured');
        setIsLoading(false);
        return;
      }

      mapboxgl.accessToken = config.mapbox.accessToken;

      if (!mapContainer.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [18.0686, 59.3293], // Stockholm coordinates
        zoom: 11,
        attributionControl: false
      });

      map.current.addControl(new mapboxgl.AttributionControl({
        compact: true
      }));

      map.current.on('load', () => {
        setIsLoading(false);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map');
        setIsLoading(false);
      });

    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to initialize map');
      setIsLoading(false);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add sauna markers when saunas data changes
  useEffect(() => {
    if (!map.current || !saunas.length || isLoading) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.sauna-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for each sauna
    saunas.forEach((sauna) => {
      // For now, we'll use approximate coordinates based on Stockholm districts
      // In a real app, you'd geocode the addresses or store coordinates in the database
      const coordinates = getApproximateCoordinates(sauna.address);
      
      if (coordinates) {
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'sauna-marker';
        markerElement.innerHTML = `
          <div class="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
            <div class="w-full h-full rounded-full bg-blue-600 animate-ping absolute"></div>
          </div>
        `;

        // Create popup with navigation link
        const slug = generateSaunaSlug(sauna.name);
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${sauna.name}</h3>
            <p class="text-xs text-gray-600">${sauna.address}</p>
            <p class="text-xs text-blue-600 mt-1">${sauna.setting}</p>
            <a href="/sauna/${slug}" class="text-xs text-blue-600 hover:text-blue-800 mt-2 inline-block">View Details →</a>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(markerElement)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      }
    });
  }, [saunas, isLoading]);

  if (error) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 text-sm">{error}</p>
          <p className="text-xs text-gray-500 mt-1">Check your Mapbox configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}

// Helper function to get approximate coordinates for Stockholm addresses
// In a real application, you would use a geocoding service or store coordinates in the database
function getApproximateCoordinates(address: string): [number, number] | null {
  const addressLower = address.toLowerCase();
  
  // Stockholm city center and surrounding areas
  if (addressLower.includes('drottninggatan') || addressLower.includes('stureplan')) {
    return [18.0686, 59.3293]; // City center
  }
  if (addressLower.includes('söder') || addressLower.includes('götgatan')) {
    return [18.0649, 59.3165]; // Södermalm
  }
  if (addressLower.includes('nacka') || addressLower.includes('hamndalsvägen')) {
    return [18.1634, 59.3117]; // Nacka
  }
  if (addressLower.includes('haninge') || addressLower.includes('hellasgården')) {
    return [18.1344, 59.1687]; // Haninge
  }
  if (addressLower.includes('tumba') || addressLower.includes('flottsbro')) {
    return [17.8333, 59.1667]; // Tumba
  }
  if (addressLower.includes('österhaninge') || addressLower.includes('ågesta')) {
    return [18.1833, 59.1333]; // Österhaninge
  }
  if (addressLower.includes('långholmen')) {
    return [18.0333, 59.3167]; // Långholmen
  }
  if (addressLower.includes('hammarby')) {
    return [18.0833, 59.3]; // Hammarby
  }
  if (addressLower.includes('blasieholmshamnen')) {
    return [18.0833, 59.3333]; // Blasieholmen
  }
  
  // Default to Stockholm center if no match
  return [18.0686, 59.3293];
}
