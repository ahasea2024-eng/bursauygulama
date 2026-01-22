import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { BURSA_CONTENT } from '../constants';
import { Category } from '../types';

export const RouteMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Map
    // Center around Bursa core
    const map = L.map(mapContainerRef.current).setView([40.1835, 29.0617], 11);
    mapInstanceRef.current = map;

    // Add Tile Layer (CartoDB Voyager for a "sweet/clean" look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Color mapping for pins
    const getPinColor = (category: Category) => {
      switch (category) {
        case Category.HISTORY: return 'bg-amber-500'; // Orange/Amber for History
        case Category.CULTURE: return 'bg-purple-500'; // Purple for Culture
        case Category.NATURE: return 'bg-emerald-500'; // Green for Nature
        case Category.FOOD: return 'bg-rose-500'; // Red/Pink for Food
        default: return 'bg-blue-500';
      }
    };

    const getIconEmoji = (category: Category) => {
      switch (category) {
        case Category.HISTORY: return '🏛️';
        case Category.CULTURE: return '🎭';
        case Category.NATURE: return '🌲';
        case Category.FOOD: return '🍖';
        default: return '📍';
      }
    };

    // Add Markers
    const markers: L.Marker[] = [];
    BURSA_CONTENT.forEach((item) => {
      const pinColorClass = getPinColor(item.category);
      const emoji = getIconEmoji(item.category);

      const customIcon = L.divIcon({
        className: 'custom-pin',
        html: `
          <div class="pin-inner ${pinColorClass} text-white font-bold">
            ${emoji}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        tooltipAnchor: [0, 16] // Offset for bottom tooltip
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon })
        .addTo(map)
        .bindTooltip(item.title, {
          permanent: true,
          direction: 'bottom',
          className: 'custom-tooltip',
          offset: [0, 5]
        })
        .bindPopup(`
          <div class="flex flex-col w-full">
            <div class="h-24 w-full bg-gray-100 relative">
               <img src="${item.imageUrl}" class="w-full h-full object-cover" alt="${item.title}" />
               <span class="absolute top-1 left-1 bg-white/90 text-xs px-2 py-0.5 rounded-full font-bold text-gray-700 shadow-sm">${item.category}</span>
            </div>
            <div class="p-3 bg-white">
              <h3 class="font-bold text-gray-800 text-sm mb-1">${item.title}</h3>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" 
                 target="_blank" 
                 class="mt-2 block w-full text-center py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors">
                 Google Haritalar'da Git
              </a>
            </div>
          </div>
        `, {
          closeButton: false,
          minWidth: 180
        });
      
      markers.push(marker);
    });

    // Zoom Handling to show/hide labels
    const handleZoom = () => {
      const zoom = map.getZoom();
      const container = map.getContainer();
      
      // Threshold: Zoom level 12 and above shows labels
      if (zoom >= 12) {
        container.classList.add('show-labels');
      } else {
        container.classList.remove('show-labels');
      }
    };

    map.on('zoomend', handleZoom);
    // Initial check
    handleZoom();

    // Cleanup
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-gray-100">
      <div ref={mapContainerRef} className="absolute inset-0 z-0" style={{ height: 'calc(100vh - 140px)' }} />
      
      {/* Legend Overlay */}
      <div className="absolute top-4 left-4 right-4 z-[400] bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 mb-2">Harita Lejantı</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-xs text-amber-900 font-medium">Tarih</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-xs text-purple-900 font-medium">Kültür</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-emerald-900 font-medium">Doğa</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="text-xs text-rose-900 font-medium">Lezzet</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">Detaylar için yakınlaştırın</p>
      </div>
    </div>
  );
};