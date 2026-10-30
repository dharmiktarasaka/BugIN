import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../context/AppContext';
import {
  mockMapMarkers,
  mockSavedPlaces,
  mapLayers,
  mapCenterSF,
} from '../data/mockLocations';
import MapControlPanel from '../components/map/MapControlPanel';
import LocationDetailCard from '../components/map/LocationDetailCard';
import {
  Search,
  Navigation,
  Layers,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  MapPin,
  Video,
  Radio,
} from 'lucide-react';

export default function LiveMap() {
  const { currentUser, showToast } = useApp();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routeLayerRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState(mapLayers[0]);
  const [layersDropdownOpen, setLayersDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMarker, setSelectedMarker] = useState(mockMapMarkers[1]); // default to Sophia
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeRouteDestination, setActiveRouteDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [mapCenterSF.lat, mapCenterSF.lng],
        zoom: mapCenterSF.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Dark Matter tile layer
      tileLayerRef.current = L.tileLayer(activeLayer.url, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      routeLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer if changed
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(activeLayer.url);
  }, [activeLayer]);

  // Render Custom Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    mockMapMarkers.forEach((marker) => {
      // Check filter
      if (activeFilter === 'meetings' && !marker.inMeeting && marker.type !== 'meeting-hub') return;
      if (activeFilter === 'team' && marker.type !== 'team-member' && marker.type !== 'nearby-contact') return;
      if (activeFilter === 'places' && marker.type !== 'saved-place') return;

      let iconHtml = '';

      if (marker.type === 'current-user') {
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div class="w-10 h-10 rounded-full bg-[#A3E635]/25 animate-ping absolute"></div>
            <div class="w-8 h-8 rounded-full bg-[#101722] border-2 border-[#A3E635] flex items-center justify-center shadow-2xl relative z-10">
              <div class="w-3.5 h-3.5 rounded-full bg-[#A3E635]"></div>
            </div>
            <div class="absolute -bottom-6 bg-[#080B12]/90 border border-[#A3E635]/50 px-2 py-0.5 rounded text-[10px] font-bold text-[#A3E635] whitespace-nowrap shadow-xl">
              You (SF HQ)
            </div>
          </div>
        `;
      } else if (marker.type === 'meeting-hub') {
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div class="w-10 h-10 rounded-xl bg-[#A3E635] text-[#080B12] flex items-center justify-center shadow-lg shadow-[#A3E635]/40 font-bold border-2 border-[#101722]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>
            </div>
            <div class="absolute -bottom-6 bg-[#101722]/95 border border-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-[#F8FAFC] whitespace-nowrap shadow-xl">
              ${marker.name.split(':')[0]}
            </div>
          </div>
        `;
      } else if (marker.type === 'saved-place') {
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer">
            <div class="w-8 h-8 rounded-xl bg-[#1C2939] border border-white/20 text-[#A3E635] flex items-center justify-center shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="absolute -bottom-6 bg-[#101722]/90 border border-white/10 px-1.5 py-0.5 rounded text-[9px] font-medium text-[#F8FAFC] whitespace-nowrap">
              ${marker.name.split('-')[0]}
            </div>
          </div>
        `;
      } else {
        // Team member / Contact marker
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div class="relative w-9 h-9 rounded-full overflow-hidden border-2 ${
              marker.inMeeting ? 'border-sky-400' : 'border-[#A3E635]'
            } shadow-xl bg-[#101722]">
              <img src="${marker.avatar}" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#A3E635] border-2 border-[#101722]"></div>
            <div class="absolute -bottom-6 bg-[#101722]/95 border border-white/15 px-1.5 py-0.5 rounded text-[9px] font-semibold text-[#F8FAFC] whitespace-nowrap shadow-xl">
              ${marker.name.split(' ')[0]} • ${marker.distance || 'GPS'}
            </div>
          </div>
        `;
      }

      const customDivIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: iconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const leafletMarker = L.marker([marker.lat, marker.lng], { icon: customDivIcon });

      leafletMarker.on('click', () => {
        setSelectedMarker(marker);
        mapInstanceRef.current?.flyTo([marker.lat, marker.lng], 15, { duration: 1.2 });
      });

      markersLayerRef.current.addLayer(leafletMarker);
    });
  }, [activeFilter]);

  // Center on current user
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([currentUser.location.lat, currentUser.location.lng], 14, {
      duration: 1.2,
    });
    setSelectedMarker(mockMapMarkers[0]);
    showToast('Centered on your current Mission Bay coordinates.', 'info');
  };

  // Zoom controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  // Draw directions route
  const handleGetDirections = (target) => {
    if (!routeLayerRef.current || !mapInstanceRef.current) return;

    if (activeRouteDestination?.id === target.id) {
      // Clear route
      routeLayerRef.current.clearLayers();
      setActiveRouteDestination(null);
      showToast('Route cleared.', 'info');
      return;
    }

    routeLayerRef.current.clearLayers();

    const start = [currentUser.location.lat, currentUser.location.lng];
    const mid1 = [
      start[0] + (target.lat - start[0]) * 0.4 + 0.003,
      start[1] + (target.lng - start[1]) * 0.3,
    ];
    const mid2 = [
      start[0] + (target.lat - start[0]) * 0.7 - 0.002,
      start[1] + (target.lng - start[1]) * 0.8,
    ];
    const end = [target.lat, target.lng];

    const latlngs = [start, mid1, mid2, end];

    // Glowing route line
    const glowLine = L.polyline(latlngs, {
      color: '#A3E635',
      weight: 6,
      opacity: 0.4,
      smoothFactor: 1,
    });

    const mainLine = L.polyline(latlngs, {
      color: '#A3E635',
      weight: 3,
      opacity: 0.95,
      dashArray: '8, 6',
      smoothFactor: 1,
    });

    routeLayerRef.current.addLayer(glowLine);
    routeLayerRef.current.addLayer(mainLine);

    mapInstanceRef.current.fitBounds(L.latLngBounds(latlngs), { padding: [60, 60] });
    setActiveRouteDestination(target);
    showToast(`Optimal route generated to ${target.name} (${target.distance || '2.1 km'})`, 'success');
  };

  const handleSelectMarkerFromPanel = (marker) => {
    setSelectedMarker(marker);
    mapInstanceRef.current?.flyTo([marker.lat, marker.lng], 15, { duration: 1.2 });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const match = mockMapMarkers.find(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (match) {
      handleSelectMarkerFromPanel(match);
      setSearchQuery('');
    } else {
      showToast(`No coordinates found matching "${searchQuery}".`, 'alert');
    }
  };

  return (
    <div
      className={`relative w-full h-[calc(100vh-64px)] bg-[#080B12] overflow-hidden select-none ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen' : ''
      }`}
    >
      {/* 1. Top Map Navigation Bar (Google Maps style) */}
      <div className="absolute top-4 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
        {/* Search bar pill */}
        <form
          onSubmit={handleSearchSubmit}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 shadow-2xl w-80 sm:w-96 focus-within:border-[#A3E635] transition-colors"
        >
          <Search className="w-4 h-4 text-[#A3E635]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search addresses, landmarks, team pins..."
            className="flex-1 bg-transparent text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none"
          />
          <button type="submit" className="text-[10px] text-[#A3E635] font-semibold">
            Search
          </button>
        </form>

        {/* Top Right Controls: Layers, Recenter, Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Layer switcher */}
          <div className="relative">
            <button
              onClick={() => setLayersDropdownOpen(!layersDropdownOpen)}
              className="p-2.5 rounded-xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 text-[#F8FAFC] hover:text-[#A3E635] shadow-2xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Layers className="w-4 h-4 text-[#A3E635]" />
              <span className="hidden sm:inline">{activeLayer.name.split(' ')[0]}</span>
            </button>

            {layersDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#151F2D] border border-white/10 shadow-2xl p-2 z-40 space-y-1">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#94A3B8]">
                  Map Style Layers
                </div>
                {mapLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setActiveLayer(layer);
                      setLayersDropdownOpen(false);
                      showToast(`Layer set to ${layer.name}`);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                      layer.id === activeLayer.id
                        ? 'bg-[#1C2939] text-[#A3E635] font-semibold'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1C2939]'
                    }`}
                  >
                    <span>{layer.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Current Location Button */}
          <button
            onClick={handleRecenter}
            className="p-2.5 rounded-xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 text-[#F8FAFC] hover:text-[#A3E635] shadow-2xl transition-colors"
            title="Center on My Location"
          >
            <Navigation className="w-4 h-4 text-[#A3E635]" />
          </button>

          {/* Fullscreen Mode Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 text-[#F8FAFC] hover:text-[#A3E635] shadow-2xl transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Left Floating Location Management Panel */}
      <MapControlPanel
        markers={mockMapMarkers}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        onSelectMarker={handleSelectMarkerFromPanel}
        selectedMarkerId={selectedMarker?.id}
      />

      {/* 3. Right Location Details Card */}
      {selectedMarker && (
        <LocationDetailCard
          marker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
          onGetDirections={handleGetDirections}
          hasActiveRoute={activeRouteDestination?.id === selectedMarker.id}
        />
      )}

      {/* 4. Bottom Right Map Zoom Controls */}
      <div className="absolute bottom-8 right-6 z-20 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="p-2.5 rounded-xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 text-[#F8FAFC] hover:text-[#A3E635] shadow-2xl transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 text-[#F8FAFC] hover:text-[#A3E635] shadow-2xl transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Bottom Left Status Indicator */}
      <div className="absolute bottom-6 left-6 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101722]/90 backdrop-blur-md border border-white/10 text-xs text-[#94A3B8]">
        <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
        <span>Sub-meter spatial mesh • GPS Telemetry 60Hz</span>
      </div>

      {/* 6. Main Leaflet Dark Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
